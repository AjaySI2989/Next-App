import React from 'react';
import Image from 'next/image';
import { COLUMNS_CONFIG, TEAM_IMG } from 'src/utils/constants';
import { getTeamFlag } from 'src/utils/commonUtils';

interface Team {
  [key: string]: any; 
}

interface Group {
  name: string;
  team: Team[];
}

interface Stage {
  is_active: string;
  groups: Group[];
}

interface StandingsData {
  standings: Record<string, Stage>;
  defaultStandingsGroup: string;
  defaultStandingsTab: Group | null;
  standingsData: Team[] | null;
  noDataText?: string;
}

interface StandingsProps {
  standings: {
    data: {
      standings: Record<string, Stage>;
    };
  };
}

const getTeamFlagImg = (teamId: string): string => {
  return getTeamFlag(TEAM_IMG, teamId, 35);
};

const parseStandingsData = (standings: StandingsProps['standings']): StandingsData | undefined => {
  try {
    const widgetData: StandingsData = {
      standings: standings.data.standings,
      defaultStandingsGroup: '',
      defaultStandingsTab: null,
      standingsData: null,
    };

    widgetData.defaultStandingsGroup = Object.keys(widgetData.standings).find(
      (data) => widgetData.standings[data].is_active === 'True'
    ) || Object.keys(widgetData.standings)[0] || '';

    const filteredGrps = widgetData.standings[widgetData.defaultStandingsGroup].groups.filter((el) => !!el.name);
    if (filteredGrps.length) {
      widgetData.standings[widgetData.defaultStandingsGroup].groups = filteredGrps;
    }

    const filterObjects = (arr: Group[]) => arr.filter((obj) => obj.team.length > 0);
    Object.keys(widgetData.standings).forEach((stg) => {
      if (widgetData.standings[stg].is_active === 'True') {
        widgetData.standings[stg].groups = filterObjects(widgetData.standings[stg].groups);
      }
    });

    widgetData.defaultStandingsTab = widgetData.standings[widgetData.defaultStandingsGroup].groups[0] || null;

    widgetData.standingsData = widgetData.defaultStandingsTab
      ? widgetData.defaultStandingsTab.team
      : null;

    return widgetData;
  } catch (e) {
    console.error(e);
  }
};

export const Standings: React.FC<StandingsProps> = ({ standings }) => {
  const parsedStandings = parseStandingsData(standings) || {
    standings: {},
    defaultStandingsGroup: '',
    defaultStandingsTab: null,
    standingsData: null,
  };

  return (
    <div>
      <div className="si-component si-standings-page si-widget">
        <div className="si-wrapper">
          <div className="si-head"></div>
          <div className="si-body">
            <div className="si-table si-standings-table">
              <div className="si-table-head" style={{ backgroundColor: 'rgb(234, 55, 162)' }}>
                <div className="si-table-row">
                  {COLUMNS_CONFIG.map((columns, idx) => (
                    <div className={`si-table-data ${columns.class}`} key={idx}>
                      <span className="si-data">{columns.display_name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="si-table-body">
                {parsedStandings.standingsData?.map((standing, standingsIdx) => (
                  <div
                    key={standingsIdx}
                    className={`si-table-row ${
                      standing.is_qualified === 'True' &&
                      parsedStandings.standingsData &&
                      parsedStandings.standingsData[standingsIdx + 1] &&
                      parsedStandings.standingsData[standingsIdx + 1].is_qualified !== 'True'
                        ? 'bgStyle(border-color)'
                        : ''
                    }`}
                  >
                    {COLUMNS_CONFIG.map((standingColumns, standingColumnsIdx) => (
                      <div
                        key={standingColumnsIdx}
                        className={`si-table-data ${
                          standingColumns.type === 'pos' && standing.is_qualified === 'True'
                            ? 'si-qualify'
                            : ''
                        } ${standingColumns.class}`}
                        style={{ display: 'block' }}
                      >
                        {standingColumns.image_key ? (
                          <div className="si-table-data-wrap">
                            <Image
                              loading="eager"
                              src={getTeamFlagImg(standing[standingColumns.image_key])}
                              alt={standing[standingColumns.short_key]}
                              className="si-team-logo lazy"
                              width={35}
                              height={24}
                            />
                            <h3 className="si-team-name">
                              <span className="si-data si-sname">{standing[standingColumns.short_key]}</span>
                              <span className="si-data si-lname">{standing[standingColumns.key]}</span>
                            </h3>
                          </div>
                        ) : (
                          <span className="si-data">{standing[standingColumns.key]}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                {parsedStandings.standingsData?.length === 0 && (
                  <div className="si-no-data-text">
                    <p className="si-text">{parsedStandings.noDataText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
