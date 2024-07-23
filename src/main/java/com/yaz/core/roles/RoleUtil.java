package com.yaz.core.roles;

import java.util.Set;

public class RoleUtil {

  public static final String ADMIN = "ADMIN";
  private static final String BUILDINGS = "BUILDINGS";
  private static final String APARTMENTS = "APARTMENTS";
  private static final String OIDC_DB_TOKEN = "OIDC_DB_TOKENS";
  private static final String EMAIL_CONFIGS = "EMAIL_CONFIGS";
  private static final String RECEIPTS = "RECEIPTS";
  private static final String USERS = "USERS";
  private static final String ROLES = "ROLES";
  private static final String BASE_ROLE = "%s_%s";
  public static final Role BUILDINGS_READ_ROLE = Role.read(BUILDINGS);
  public static final String BUILDINGS_READ = BUILDINGS_READ_ROLE.role();
  public static final Role BUILDINGS_WRITE_ROLE = Role.write(BUILDINGS);
  public static final String BUILDINGS_WRITE = BUILDINGS_WRITE_ROLE.role();
  public static final Role APARTMENTS_READ_ROLE = Role.read(APARTMENTS);
  public static final String APARTMENTS_READ = APARTMENTS_READ_ROLE.role();
  public static final Role APARTMENTS_WRITE_ROLE = Role.write(APARTMENTS);
  public static final String APARTMENTS_WRITE = APARTMENTS_WRITE_ROLE.role();
  public static final Role OIDC_DB_TOKENS_READ_ROLE = Role.read(OIDC_DB_TOKEN);
  public static final String OIDC_DB_TOKENS_READ = OIDC_DB_TOKENS_READ_ROLE.role();
  public static final Role OIDC_DB_TOKENS_WRITE_ROLE = Role.write(OIDC_DB_TOKEN);
  public static final String OIDC_DB_TOKENS_WRITE = OIDC_DB_TOKENS_WRITE_ROLE.role();
  public static final Role EMAIL_CONFIGS_READ_ROLE = Role.read(EMAIL_CONFIGS);
  public static final String EMAIL_CONFIGS_READ = EMAIL_CONFIGS_READ_ROLE.role();
  public static final Role EMAIL_CONFIGS_WRITE_ROLE = Role.write(EMAIL_CONFIGS);
  public static final String EMAIL_CONFIGS_WRITE = EMAIL_CONFIGS_WRITE_ROLE.role();
  public static final Role RECEIPTS_READ_ROLE = Role.read(RECEIPTS);
  public static final Role RECEIPTS_WRITE_ROLE = Role.write(RECEIPTS);
  public static final String RECEIPTS_WRITE = RECEIPTS_WRITE_ROLE.role();
  public static final Role USERS_READ_ROLE = Role.read(USERS);
  public static final String USERS_READ = USERS_READ_ROLE.role();
  public static final Role USERS_WRITE_ROLE = Role.write(USERS);
  public static final String USERS_WRITE = USERS_WRITE_ROLE.role();
  public static final Role ROLES_READ_ROLE = Role.read(ROLES);
  public static final String ROLES_READ = ROLES_READ_ROLE.role();
  public static final Role ROLES_WRITE_ROLE = Role.write(ROLES);
  public static final Set<Role> ALL = Set.of(
      BUILDINGS_READ_ROLE, BUILDINGS_WRITE_ROLE,
      APARTMENTS_READ_ROLE, APARTMENTS_WRITE_ROLE,
      OIDC_DB_TOKENS_READ_ROLE, OIDC_DB_TOKENS_WRITE_ROLE,
      EMAIL_CONFIGS_READ_ROLE, EMAIL_CONFIGS_WRITE_ROLE,
      RECEIPTS_READ_ROLE, RECEIPTS_WRITE_ROLE,
      USERS_READ_ROLE, USERS_WRITE_ROLE,
      ROLES_READ_ROLE, ROLES_WRITE_ROLE
  );
  public static final String ROLES_WRITE = ROLES_WRITE_ROLE.role();
  public static final String RECEIPTS_READ = BASE_ROLE.formatted(RECEIPTS, Role.Type.READ);

  public record Role(
      String role,
      Role.Type type,
      String resource
  ) {

    public static Role of(String resource, Role.Type type) {
      return new Role(BASE_ROLE.formatted(resource, type), type, resource);
    }

    public static Role read(String resource) {
      return of(resource, Role.Type.READ);
    }

    public static Role write(String resource) {
      return of(resource, Role.Type.WRITE);
    }

    public enum Type {
      READ, WRITE
    }
  }


}
