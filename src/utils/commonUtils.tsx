export const getTeamFlag = (flagsUrl: string, teamId: string, size?: number): string => {
    const flagSize = size || 35;
    return flagsUrl
      .replace('{{TEAM_ID}}', teamId)
      .replace('{{w}}', flagSize.toString())
      .replace('{{PLAYER_ID}}', teamId);
};