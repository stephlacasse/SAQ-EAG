import json
import boto3
 
dynamodb = boto3.resource("dynamodb")
 
def return_message(status_code, message):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        },
        "body": json.dumps(message)
    }
 
def scan_table(table_name):
    """Scan a DynamoDB table and return all items."""
    table = dynamodb.Table(table_name)
    response = table.scan()
    data = response.get("Items", [])
 
    while "LastEvaluatedKey" in response:
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        data.extend(response.get("Items", []))
 
    return data
 
def lambda_handler(event, context):
    """Lambda handler function."""
    try:
        # Get the name from the events body
        body = event.get('body', '{}')
        body_json = json.loads(body)
        name = body_json.get("name")
        if not name:
            return return_message(400, {"error": "Missing 'name' parameter"})
 
        # Construct table names
        table_ferie = f"{name}-Ferie"
        table_messages = f"{name}-Messages-Urgences"
        table_fermeture = f"{name}-Messages-Fermeture"
        table_attente = f"{name}-Messages-Attente"
 
        # Fetch data from all tables
        ferie_data = scan_table(table_ferie)
        messages_data = scan_table(table_messages)
        fermeture_data = scan_table(table_fermeture)
        attente_data = scan_table(table_attente)
 
        return return_message(200, {
            "Ferie": ferie_data,
            "MessagesUrgences": messages_data,
            "MessagesFermeture": fermeture_data,
            "MessagesAttente": attente_data
        })
 
    except Exception as e:
        return return_message(500, {"error": str(e)})