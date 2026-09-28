import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import TabBar, { Screen } from "./components/TabBar";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { cartReducer, initialCart } from "./lib/cart";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [note, setNote] = useState("");

  const cartCount = cart.items.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TabBar current={screen} onChange={setScreen} cartCount={cartCount} />
      </View>
      <View style={styles.content}>
        {screen === "menu" && (
          <MenuScreen onAdd={(item) => dispatch({ type: "add", item })} />
        )}
        {screen === "cart" && (
          <CartScreen
            items={cart.items}
            onRemove={(id) => dispatch({ type: "remove", id })}
            onCheckout={() => setScreen("checkout")}
          />
        )}
        {screen === "checkout" && (
          <CheckoutScreen
            items={cart.items}
            note={note}
            onNoteChange={setNote}
            onBack={() => setScreen("cart")}
            onDone={() => {
              dispatch({ type: "clear" });
              setNote("");
              setScreen("menu");
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
  },
});
