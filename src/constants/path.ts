export const path = {
  ROOT: "/",
  SIGN: "/sign",
  HOME: "/home",
  WORKSPACES: "/workspaces&mini-apps",
  PEOPLE: "/people",
  ANNOUNCEMENTS: "/announcements",
  SETTINGS: "/settings",
}

export const pathWithSlug = {
  WORKSPACE_SLUG: (workspace: string) => `${path.WORKSPACES}/${workspace}`,
  SECOND_LEVEL: (workspace: string, second: string) => `${path.WORKSPACES}/${workspace}/${second}`,
  THIRD_LEVEL: (workspace: string, second: string, third: string) => `${path.WORKSPACES}/${workspace}/${second}/${third}`,
}
