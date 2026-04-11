import { FlatList, StyleSheet, View } from "react-native";
import { MENU, MenuItem } from "../lib/menu";
import MenuItemCard from "../components/MenuItemCard";

type Props = {
  onAdd: (item: MenuItem) => void;
};

export default function MenuScreen({ onAdd }: Props) {
  return (
    <FlatList
      data={MENU}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      renderItem={({ item }) => (
        <MenuItemCard item={item} onAdd={() => onAdd(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  sep: {
    height: 12,
  },
});
