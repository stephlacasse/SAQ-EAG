module "lambda_function_crud_messages_fermeture" {
  source = "terraform-aws-modules/lambda/aws"
  # Source: https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest

  function_name = "EAG-${var.projet}-Crud-messages-fermeture"
  description   = "Effectue les operation create, toggle or detele sur les messages de fermeture"
  handler       = "crud_messages_fermeture.lambda_handler"
  runtime       = "python3.13"
  timeout       = 30

  source_path = [
    "${path.module}/lambda/crud_messages_fermeture.py"
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
 