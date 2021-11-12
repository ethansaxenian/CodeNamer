import { Text } from "galio-framework";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';

export default function ClueViewer({ clues, clueColor }) {
  const [activeSections, setActiveSections] = useState([]);

  const sections = [2, 3, 4].map((n) => (
    {
      header: `Clues for ${n}`,
      content: clues.filter(({ num }) => +num === n)
    }
  ));

  const renderHeader = (section) => {
    return (
      <View style={styles.accordionHeader}>
        <Text h4>{section.header}</Text>
      </View>
    )
  }

  const renderContent = (section) => {
    return (
      <FlatList
        style={styles.clueList}
        data={section.content}
        renderItem={({ item }) => (
          <View>
            <Text h6 style={[styles.clue, { color: clueColor }]}>
              {_.upperFirst(item.word)} {item.cards.length}:
            </Text>
            <Text h6 style={styles.cards}>
              {_.join(item.cards.map((card) => _.upperFirst(card)), ", ")}
            </Text>
          </View>
        )}
      />
    )
  }

  const updateActiveSections = (activeSections) => {
    setActiveSections(activeSections)
  }

  return (
    <View>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateActiveSections}
        expandMultiple
      />
    </View>
  );
}

const styles = StyleSheet.create({
  accordionHeader: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    marginHorizontal: "auto",
    paddingHorizontal: 150,
    paddingVertical: 15
  },
  clueList: {
    borderWidth: 1,
    borderRadius: 8
  },
  clue: {
    fontWeight: 'bold',
    paddingVertical: 15,
    margin: "auto"
  },
  cards: {
    paddingVertical: 15,
    margin: "auto"
  },
})
