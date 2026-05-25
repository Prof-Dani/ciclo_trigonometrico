import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  // Estado para guardar o ângulo atual selecionado pelo usuário
  const [angulo, setAngulo] = useState(0);

  // Raio do círculo desenhado na tela (metade do tamanho do círculo)
  const raio = 125; 

  // Converter o ângulo de graus para radianos (necessário para o JavaScript calcular)
  const radiano = (angulo * Math.PI) / 180;

  // Calcular as coordenadas X e Y do ponto dourado usando Seno e Cosseno
  // Multiplicamos pelo raio para o ponto se mover exatamente em cima da linha azul
  const pontoX = raio * Math.cos(radiano);
  const pontoY = -raio * Math.sin(radiano); // Negativo porque no celular o Y cresce para baixo

  return (
    <View style={styles.container}>
      {/* Título e Valor do Ângulo */}
      <Text style={styles.title}>📐 Ciclo Trigonométrico</Text>
      <Text style={styles.angleDisplay}>Ângulo: {Math.round(angulo)}°</Text>

      {/* Área do Gráfico */}
      <View style={styles.graphicArea}>
        
        {/* O Círculo Azul */}
        <View style={styles.circle}>
          
          {/* Eixo Y (Verde) e Eixo X (Vermelho) */}
          <View style={styles.axisY} />
          <View style={styles.axisX} />
          
          {/* O Ponto Móvel (Dourado) */}
          <View 
            style={[
              styles.movingPoint, 
              {
                // Move o ponto dinamicamente a partir do centro do círculo
                transform: [
                  { translateX: pontoX },
                  { translateY: pontoY }
                ]
              }
            ]} 
          />
          
        </View>

      </View>

      {/* Barra de Arrastar (Slider) */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Arraste para mudar o ângulo:</Text>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={360}
          minimumTrackTintColor="#4da6ff"
          maximumTrackTintColor="#888"
          thumbTintColor="#ffcc00"
          value={angulo}
          onValueChange={(valor) => setAngulo(valor)} // Atualiza o ângulo em tempo real
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  angleDisplay: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffcc00', // Cor dourada para o destaque do ângulo
    marginBottom: 30,
  },
  graphicArea: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 3,
    borderColor: '#4da6ff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  axisX: {
    width: '100%',
    height: 2,
    backgroundColor: '#ff4d4d',
    position: 'absolute',
  },
  axisY: {
    width: 2,
    height: '100%',
    backgroundColor: '#4dff4d',
    position: 'absolute',
  },
  movingPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffcc00', // Ponto dourado
    position: 'absolute',
    // Sombra para o ponto brilhar
    shadowColor: '#ffcc00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  sliderContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  sliderLabel: {
    color: '#aaa',
    marginBottom: 10,
    fontSize: 14,
  },
});