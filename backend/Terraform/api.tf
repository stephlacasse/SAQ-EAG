# Create API Gateway REST API
resource "aws_api_gateway_rest_api" "root_api" {
  name        = "SAQ-EAG-API-${var.projet}-${var.env}"
  description = "REST API for saq eag with Cognito Authorization"
}

# Create Deployment
resource "aws_api_gateway_deployment" "root_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  depends_on = [
    aws_api_gateway_integration.get_center_integration,
    aws_api_gateway_integration.get_center_options,
    aws_api_gateway_integration_response.get_center_options_integration_response
  ]
}

resource "aws_api_gateway_stage" "root_api_stage" {
  deployment_id = aws_api_gateway_deployment.root_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.root_api.id
  stage_name    = var.env

  lifecycle {
    ignore_changes = [deployment_id]
  }
}

# Create Cognito Authorizer
resource "aws_api_gateway_authorizer" "cognito" {
  name          = "CognitoUserPoolAuthorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_rest_api.root_api.id
  provider_arns = [aws_cognito_user_pool.app_user_pool.arn]
}