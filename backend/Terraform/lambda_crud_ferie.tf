module "lambda_function_crud_ferie" {
  source = "terraform-aws-modules/lambda/aws"
  # Source: https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest

  function_name = "EAG-${var.projet}-Crud-Ferie"
  description   = "Effectue les operation create or detele sur les dates de ferie"
  handler       = "crud_ferie.lambda_handler"
  runtime       = "python3.13"
  timeout       = 30

  source_path = [
    "${path.module}/lambda/crud_ferie.py"
  ]

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