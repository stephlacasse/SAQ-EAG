
output "VITE_USER_POOL_ID" {
  value = aws_cognito_user_pool.app_user_pool.id
}

output "VITE_USER_POOL_CLIENT_ID" {
  value = aws_cognito_user_pool_client.app_client.id
}

output "VITE_USER_POOL_DOMAIN" {
  value = aws_cognito_user_pool_domain.app_domain.domain
}

output "VITE_API_URL" {
  value = aws_api_gateway_stage.root_api_stage.invoke_url
}

output "VITE_USE_BILINGUAL_MESSAGES" {
  value = var.use_bilingual_messages
}

output "VITE_CLOUDFRONT_DISTRIBUTION_URL" {
  value = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}/"
}