import boto3
import json

# Create a low-level DynamoDB client
dynamodb = boto3.client('dynamodb')

def return_message(status_code, message):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        },
        "body": json.dumps(message)
    }

def lambda_handler(event, context):
    try:
        # Get the request body from the event (default to an empty JSON if missing)
        body = event.get('body', '{}')
        body_json = json.loads(body)
        
        # Extract parameters
        name = body_json.get("name")
        action = body_json.get("action")
        date = body_json.get("date")
        
        # Validate required fields
        if not name or action not in ['create', 'delete'] or not date:
            return return_message(400, {"error": "Missing or invalid parameters"})
        
        # Form the target table name
        table_name = f"{name}-Ferie"
        
        # Fetch the current item that stores the list of dates (with id: "FERIE")
        response = dynamodb.get_item(
            TableName=table_name,
            Key={'id': {'S': 'FERIE'}}
        )
        item = response.get('Item')
        
        # If item doesn't exist, initialize it with an empty Dates list
        if not item:
            item = {
                'id': {'S': 'FERIE'},
                'Dates': {'L': []}
            }
        
        # Convert the DynamoDB "Dates" list to a Python list of strings
        dates_list = [entry['S'] for entry in item.get('Dates', {}).get('L', [])]
        
        # Perform the operation based on action
        if action == "create":
            if date in dates_list:
                return return_message(200, {"message": f"Date {date} already exists."})
            dates_list.append(date)
        elif action == "delete":
            if date not in dates_list:
                return return_message(200, {"message": f"Date {date} not found."})
            dates_list.remove(date)
        
        # Prepare the dates list in DynamoDB format (each date as a dict with key "S")
        dynamo_dates = [{'S': d} for d in dates_list]
        
        # Update the item in DynamoDB with the new dates list using put_item
        dynamodb.put_item(
            TableName=table_name,
            Item={
                'id': {'S': 'FERIE'},
                'Dates': {'L': dynamo_dates}
            }
        )
        
        return return_message(200, {"message": f"Successfully performed {action} on date {date}."})
    
    except Exception as e:
        return return_message(500, {"error": str(e)})
