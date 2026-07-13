module "lambda_function_crud_messages_attente" {
  source = "terraform-aws-modules/lambda/aws"
  # Source: https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest

  function_name = "EAG-${var.projet}-Crud-messages-attente"
  description   = "Effectue les operation create, toggle or delete sur les messages d'attente"
  handler       = "crud_messages_attente.lambda_handler"
  runtime       = "python3.13"
  timeout       = 30

  source_path = [
    "${path.module}/lambda/crud_messages_attente.py"
  ]

  environment_variables = {
    USE_BILINGUAL_MESSAGES = var.use_bilingual_messages
  }

  attach_policy_json = true
  policy_json        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": "*"
        }
    ]
}
EOF    
}
