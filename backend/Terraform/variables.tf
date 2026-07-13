variable "projet" {
  description = "L'accronyme du projet pour lequel cet EAG est deployer"
  type        = string
  default     = "ppse"
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ca-central-1"
}

variable "env" {
  description = "Environment name (dev or prod)"
  type        = string
  default     = "dev"

}
variable "use_bilingual_messages" {
  description = "Flag to enable/disable bilingual messages feature (true/false)"
  type        = string
  default     = "false"

  validation {
    condition     = var.use_bilingual_messages == "true" || var.use_bilingual_messages == "false"
    error_message = "use_bilingual_messages must be true or false"
  }
}