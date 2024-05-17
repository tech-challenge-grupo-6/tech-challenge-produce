terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.6.0"
    }
  }
}

provider "mongodbatlas" {
  public_key                    = var.public_key
  private_key                   = var.private_key
}

resource "mongodbatlas_cluster" "tc-db-produce" {
  project_id                    = var.project_id
  name                          = "tc-db-produce"
  mongo_db_major_version        = "7.0"

  // Provider settings
  provider_name                 = "TENANT"
  backing_provider_name         = "AWS"
  provider_region_name          = "US_EAST_1"
  provider_instance_size_name   = "M0"
  auto_scaling_disk_gb_enabled  = false
}

resource "mongodbatlas_database_user" "admin" {
  username           = var.mongodb_atlas_database_username
  password           = var.mongodb_atlas_database_password
  project_id         = var.project_id
  auth_database_name = "admin"

  roles {
    role_name     = "dbAdmin"
    database_name = "tech_challenge_db"
  }

  roles {
    role_name     = "readWrite"
    database_name = "tech_challenge_db"
  }
}

output "db_cn_string" {
    value = mongodbatlas_cluster.tc-db-produce.connection_strings.0.standard_srv
}