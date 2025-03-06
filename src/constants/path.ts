export const path = {
  ROOT: "/",
  SIGN: "/sign",
  HOME: "/home",
  CREATE_WORKSPACE: "/workspaces-mini-apps/create-workspace",
  CREATE_MINI_APP: "/workspaces-mini-apps/create-mini-app",
  WORKSPACES_MINI_APPS: "/workspaces-mini-apps",
  WORKSPACES: "/workspaces-mini-apps/workspaces",
  MINI_APPS: "/workspaces-mini-apps/mini-apps",
  PEOPLE: "/people",
  CREATE_ANNOUNCEMENT: "/announcements/create",
  ANNOUNCEMENTS: "/announcements",
  SETTINGS: "/settings",
}

export const pathWithSlug = {
  MINI_APP_SLUG: (miniApp: string) => `${path.MINI_APPS}/${miniApp}`,
  WORKSPACE_SLUG: (workspace: string) => `${path.WORKSPACES}/${workspace}`,
  SECOND_LEVEL: (workspace: string, second: string) => `${path.WORKSPACES}/${workspace}/${second}`,
  THIRD_LEVEL: (workspace: string, second: string, third: string) => `${path.WORKSPACES}/${workspace}/${second}/${third}`,
}
