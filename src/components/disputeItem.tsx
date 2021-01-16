import React, { FC } from 'react';
import { Icon, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface Props {
    name: string;
    description: string;
}

const ItemImage = () => (
  <Icon
    style={styles.icon}
    fill='#8F9BB3'
    name={'archive-outline'}
  />
);

const DisputeItem : FC<Props> = ({name, description}:Props) => {
    return (
        <ListItem
            title={evaProps => <Text {...evaProps}>{name}</Text>}
            description={evaProps => <Text {...evaProps}>{description}</Text>}
            accessoryLeft={ItemImage}
            style={styles.listItem}
        />
    )
}

export default DisputeItem;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  listItem: {
      borderBottomWidth: 1,
      borderColor: '#c4c4c4'
  }
});