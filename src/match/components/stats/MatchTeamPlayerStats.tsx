import numeral from 'numeral';

interface MatchTeamPlayerStatsProps {
  matchProviderId: string;
  teamProviderId: string;
  usePoll?: boolean;
}

const STATS_HEADER = [
  'MIN',
  'PTS',
  'REB',
  'AST',
  'FG',
  '3PT',
  'FT',
  'PF',
  'STL',
  'BLK',
  'TOV',
  '+/-',
];

export default function MatchTeamPlayerStats({
  matchProviderId,
  teamProviderId,
  usePoll = false,
}) {
  return (
    <View style={styles.squadContainer}>
      <View style={styles.thead}>
        <View style={[styles.firstTh, styles.thCell]}>
          <Text style={styles.thLabel}>JUGADORES</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={tableHeader}
        >
          <View style={styles.table}>
            <View style={styles.row}>
              {STATS_HEADER.map((header, index) => (
                <View
                  key={index}
                  style={[
                    styles.thCell,
                    ['FG', '3PT', 'FT'].includes(header)
                      ? styles.th2
                      : styles.th,
                  ]}
                >
                  <Text style={[styles.thLabel, styles.textCenter]}>
                    {header}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <ScrollView
        style={styles.tableHeight}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.bodyContainer}>
          <View style={[styles.firstTd]}>
            {data.map((player, index) => (
              <View key={`player-${player.player.providerId}`}>
                {index > 0 && <Divider space={0} />}
                <Link href={`/player/${player.player.providerId}`} asChild>
                  <Pressable onPress={() => selection()}>
                    <View style={styles.tdCell}>
                      <View style={styles.playerInfo}>
                        <Text style={styles.playerShirtLabel}>
                          {player.player.shirtNumber}
                        </Text>
                        <Text style={styles.playerNameLabel}>
                          {truncate(player.player.name, 15)}
                        </Text>
                        <Text style={styles.playerPositionLabel}>
                          {player.player.playingPosition}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              </View>
            ))}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleHorizontalScroll}
            bounces={false}
          >
            <View style={styles.table}>
              <View style={styles.tbody}>
                {data.map((player, index) => (
                  <View key={`player-${player.player.providerId}-stats`}>
                    {index > 0 && <Divider space={0} />}
                    <View style={styles.row}>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.minutes).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.points).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.reboundsTotal).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.assists).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td2]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.fieldGoalsMade).format('0')}
                          {'-'}
                          {numeral(player.boxscore.fieldGoalsAttempted).format(
                            '0'
                          )}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td2]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.threePointersMade).format(
                            '0'
                          )}
                          {'-'}
                          {numeral(
                            player.boxscore.threePointersAttempted
                          ).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td2]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.freeThrowsMade).format('0')}
                          {'-'}
                          {numeral(player.boxscore.freeThrowsAttempted).format(
                            '0'
                          )}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.foulsPersonal).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.steals).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.blocks).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.turnovers).format('0')}
                        </Text>
                      </View>
                      <View style={[styles.tdCell, styles.td]}>
                        <Text style={[styles.tdLabel, styles.textCenter]}>
                          {numeral(player.boxscore.plusMinusPoints).format('0')}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
