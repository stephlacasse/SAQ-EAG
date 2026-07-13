module "lambda_function_get_center" {
  source = "terraform-aws-modules/lambda/aws"
  # Source: https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest

  function_name = "EAG-${var.projet}-Get-Center"
  description   = "Returs les messages d'urgence et les ferie pour un centre de contact"
  handler       = "get_center.lambda_handler"
  runtime       = "python3.13"
  timeout       = 30

  source_path = [
    "${path.module}/lambda/get_center.py"
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