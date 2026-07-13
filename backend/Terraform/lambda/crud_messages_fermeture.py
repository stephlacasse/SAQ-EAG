import json
import boto3
import time
import os # Import os module
 
# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')
 
# Read the feature toggle from environment variables
# Default to False if not set or invalid value, converting string 'true' (case-insensitive) to bool
use_bilingual_messages_str = os.environ.get('USE_BILINGUAL_MESSAGES', 'False')
use_bilingual_messages = use_bilingual_messages_str.lower() == 'true'
 
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
        # Get the request body and parse JSON
        body = event.get('body', '{}')
        body_json = json.loads(body)
       
        # Retrieve required fields
        name = body_json.get("name")
        action = body_json.get("action")
       
        # Validate presence of required fields
        if not name or not action:
            return return_message(400, {"error": "Missing 'name' or 'action' parameter."})
       
        # Target table based on the name
        table_name = f"{name}-Messages-Fermeture"
       
        # CREATE action: add a new item with a generated id and message content
        if action == "create":
            new_id = str(int(time.time() * 1000))
            item_to_put = {
                'id': {'S': new_id},
                'actif': {'BOOL': True}
            }
 
            if use_bilingual_messages:
                message_fr = body_json.get("message_fr")
                message_en = body_json.get("message_en")
                if not message_fr or not message_en:
                    return return_message(400, {"error": "Missing 'message_fr' or 'message_en' for create action."})
                item_to_put['message_fr'] = {'S': message_fr}
                item_to_put['message_en'] = {'S': message_en}
            else:
                message = body_json.get("message")
                if not message:
                    return return_message(400, {"error": "Missing 'message' for create action."})
                item_to_put['message'] = {'S': message}
 
            # Put the new item into DynamoDB
            dynamodb.put_item(
                TableName=table_name,
                Item=item_to_put
            )
            return return_message(200, {"message": "Item created", "id": new_id})
       
        # DELETE action: remove an item based on id
        elif action == "delete":
            id_val = body_json.get("id")
            if not id_val:
                return return_message(400, {"error": "Missing 'id' for delete action."})
           
            dynamodb.delete_item(
                TableName=table_name,
                Key={
                    'id': {'S': id_val}
                }
            )
            return return_message(200, {"message": "Item deleted", "id": id_val})
       
        # TOGGLE action: switch the 'actif' status of the item with the given id
        elif action == "toggle":
            id_val = body_json.get("id")
            if not id_val:
                return return_message(400, {"error": "Missing 'id' for toggle action."})
           
            # First, retrieve the item to determine its current 'actif' status.
            get_response = dynamodb.get_item(
                TableName=table_name,
                Key={
                    'id': {'S': id_val}
                }
            )
            item = get_response.get('Item')
            if not item:
                return return_message(404, {"error": "Item not found", "id": id_val})
           
            current_status = item.get('actif', {}).get('BOOL', False)
            new_status = not current_status
           
            # Update the 'actif' attribute with the new status.
            dynamodb.update_item(
                TableName=table_name,
                Key={
                    'id': {'S': id_val}
                },
                UpdateExpression="SET actif = :val",
                ExpressionAttributeValues={
                    ':val': {'BOOL': new_status}
                },
                ReturnValues="UPDATED_NEW"
            )
            return return_message(200, {"message": "Item toggled", "id": id_val, "actif": new_status})
       
        else:
            return return_message(400, {"error": "Invalid action. Must be 'create', 'delete', or 'toggle'."})
   
    except Exception as e:
        return return_message(500, {"error": str(e)})
 
 