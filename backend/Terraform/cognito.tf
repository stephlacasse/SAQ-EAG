resource "aws_cognito_user_pool" "app_user_pool" {
  name = "${var.projet}-eag-${var.env}-user-pool"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
  }

  auto_verified_attributes = ["email"]

  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
    mutable             = false

    string_attribute_constraints {
      min_length = 0
      max_length = 2048
    }
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = false
    mutable             = true

    string_attribute_constraints {
      min_length = 0
      max_length = 2048
    }
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  # This prevents the schema from being modified after the user pool is created
  lifecycle {
    ignore_changes = [schema]
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name                          = "saq-eag-${var.env}-client"
  user_pool_id                  = aws_cognito_user_pool.app_user_pool.id
  generate_secret               = false
  prevent_user_existence_errors = "ENABLED"
  callback_urls                 = ["https://${aws_cloudfront_distribution.s3_distribution.domain_name}/"] # Update with your app's callback URLs
  logout_urls                   = ["https://${aws_cloudfront_distribution.s3_distribution.domain_name}/"] # Update with your app's logout URLs

  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["openid", "email", "profile"]
  supported_identity_providers         = ["Azure"]
  allowed_oauth_flows_user_pool_client = true
}

resource "aws_cognito_user_pool_domain" "app_domain" {
  domain       = "${var.projet}-eag-${var.env}-auth" # Change to a unique subdomain for your region
  user_pool_id = aws_cognito_user_pool.app_user_pool.id
} 