resource "aws_api_gateway_resource" "crud_ferie_resource" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  parent_id   = aws_api_gateway_rest_api.root_api.root_resource_id
  path_part   = "ferie"
}

resource "aws_api_gateway_method" "crud_ferie_method" {
  rest_api_id   = aws_api_gateway_rest_api.root_api.id
  resource_id   = aws_api_gateway_resource.crud_ferie_resource.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

resource "aws_api_gateway_integration" "crud_ferie_integration" {
  rest_api_id             = aws_api_gateway_rest_api.root_api.id
  resource_id             = aws_api_gateway_resource.crud_ferie_resource.id
  http_method             = aws_api_gateway_method.crud_ferie_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${module.lambda_function_crud_ferie.lambda_function_arn}/invocations"
}

resource "aws_lambda_permission" "api_gateway_invoke_crud_ferie" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function_crud_ferie.lambda_function_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.root_api.execution_arn}/*/*"
}

# Add OPTIONS method for CORS
resource "aws_api_gateway_method" "crud_ferie_options" {
  rest_api_id   = aws_api_gateway_rest_api.root_api.id
  resource_id   = aws_api_gateway_resource.crud_ferie_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Add OPTIONS method integration
resource "aws_api_gateway_integration" "crud_ferie_options" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  resource_id = aws_api_gateway_resource.crud_ferie_resource.id
  http_method = aws_api_gateway_method.crud_ferie_options.http_method
  type        = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Add CORS method response
resource "aws_api_gateway_method_response" "crud_ferie_options_200" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  resource_id = aws_api_gateway_resource.crud_ferie_resource.id
  http_method = aws_api_gateway_method.crud_ferie_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# Add CORS integration response
resource "aws_api_gateway_integration_response" "crud_ferie_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  resource_id = aws_api_gateway_resource.crud_ferie_resource.id
  http_method = aws_api_gateway_method.crud_ferie_options.http_method
  status_code = aws_api_gateway_method_response.crud_ferie_options_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Add CORS response for the POST method
resource "aws_api_gateway_method_response" "crud_ferie_post_200" {
  rest_api_id = aws_api_gateway_rest_api.root_api.id
  resource_id = aws_api_gateway_resource.crud_ferie_resource.id
  http_method = aws_api_gateway_method.crud_ferie_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}