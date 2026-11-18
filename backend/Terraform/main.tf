terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0.0"
    }
  }

  backend "s3" {
    #profile = "861276084014_AWSAdministratorAccess" #ProfileDev
    profile = "038462790905_AWSAdministratorAccess" #ProfileTest
    #profile = "597088060431_AWSAdministratorAccess" #ProfileProd
  }
}

provider "aws" {
  #profile = "861276084014_AWSAdministratorAccess" #ProfileDev
  profile = "038462790905_AWSAdministratorAccess" #ProfileTest
  #profile = "597088060431_AWSAdministratorAccess" #ProfileProd
  region = "ca-central-1"
}