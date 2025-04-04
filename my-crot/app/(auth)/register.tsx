// app/screens/RegisterScreen.tsx (або src/screens, залежно від структури)
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const  handleSubmit = async () => {
        if (form.password !== form.confirmPassword) {
            alert("Паролі не співпадають!");
            return;
        }

        try {

            const response = await fetch("http://10.0.0.42:8083/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: form.email,
                    password: form.password,
                }),
            });

            console.log("Data:", response.status);
            const data = await response.json();

            if (response.ok) {
                alert("Реєстрація успішна! Перенаправляємо до входу...");
                router.replace("/login");
            } else {
                alert(data.message || "Помилка при реєстрації");
            }
        } catch (error) {
            console.error("Помилка реєстрації:", error);
            alert("Не вдалося з'єднатися з сервером");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                    >
                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{ minHeight: Dimensions.get("window").height - 100 }}
                        >
                            <Text className="text-3xl font-bold mb-6 text-black">
                                Реєстрація
                            </Text>

                            <FormField
                                title="Пошта"
                                value={form.email}
                                handleChangeText={(value: string) => handleChange("email", value)}
                                placeholder="Вкажіть пошту"
                                keyboardType="email-address"
                            />

                            <FormField
                                title="Пароль"
                                value={form.password}
                                handleChangeText={(value: string) => handleChange("password", value)}
                                placeholder="Вкажіть пароль"
                                secureTextEntry
                            />

                            <FormField
                                title="Підтвердіть пароль"
                                value={form.confirmPassword}
                                handleChangeText={(value: string) => handleChange("confirmPassword", value)}
                                placeholder="Повторіть пароль"
                                secureTextEntry
                            />

                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="w-full bg-green-500 p-4 rounded-lg mt-4"
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Зареєструватися
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.replace("/login")} // Повернення до входу
                                className="w-full bg-gray-300 p-4 rounded-lg mt-2"
                            >
                                <Text className="text-black text-center text-lg font-medium">
                                    Вже маєте акаунт? Увійти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RegisterScreen;
