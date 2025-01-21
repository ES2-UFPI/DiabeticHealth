import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { globalStyles } from '../../constants/styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoginEmail = () => {
    if (email && senha) {
      // Implementar lógica de login com email
      console.log('Login com email:', email);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleLoginFacebook = () => {
    // Implementar lógica de login com Facebook
    console.log('Login com Facebook iniciado');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={globalStyles.title}>DiabeticHealth</Text>
        
        {/* Espaço reservado para o logo */}
        <View style={globalStyles.logoContainer} />

        <View style={globalStyles.form}>
          <Text style={globalStyles.label}>E-mail:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={globalStyles.label}>Senha:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={globalStyles.forgotPassword}>
            <Text style={globalStyles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.button} onPress={handleLoginEmail}>
            <Text style={globalStyles.buttonText}>Entrar com E-mail</Text>
          </TouchableOpacity>

          <View style={globalStyles.divider}>
            <View style={globalStyles.dividerLine} />
            <Text style={globalStyles.dividerText}>ou</Text>
            <View style={globalStyles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={[globalStyles.button, globalStyles.facebookButton]} 
            onPress={handleLoginFacebook}
          >
            <Text style={globalStyles.buttonText}>Entrar com Facebook</Text>
          </TouchableOpacity>

          <View style={globalStyles.signupContainer}>
            <Text style={globalStyles.signupText}>Ainda não tem uma conta? </Text>
            <TouchableOpacity>
              <Text style={globalStyles.signupLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
