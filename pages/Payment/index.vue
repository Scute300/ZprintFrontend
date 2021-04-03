<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns is-mobile">
        <div class="column is-3 is-offset-9">
          <button
            class="button is-primary is-inverted is-medium"
            style="background-color: #F2F2F2;"
          >
            Planes
          </button>
          <button 
            class="button is-primary is-inverted is-medium" 
            style="background-color: #F2F2F2;"
          >
            Historial
          </button>
        </div>
      </div>
      <div class="columns">
        <div class="columns is-12">
          <h2 class="title is-3">Seleccionar Plan</h2>
        </div>
      </div>
      <div id="separator" />
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <div class="littleBox">
            <button class="button is-text buttonsCurrency">Mensual</button>
          </div>
        </div>
      </div>
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <div class="littleBox">
            <button v-for="usuario in usuarios" class="button is-text buttonsCurrency">
              {{ usuario }}
            </button>
          </div>
        </div>
      </div>
      <div class="columns">
        <div v-for="plan in plans" class="column is-6">
          <div class="box" :style="{ backgroundColor: plan.color }">
            <div class="columns is-centered">
              <div class="column is-12">
                <h3
                  class="title is-4 has-text-centered"
                  :style="{ color: plan.textColor }"
                >
                  {{ plan.name }}
                </h3>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="column is-12">
                <h3
                  class="title is-3 has-text-centered"
                  :style="{ color: plan.textColor }"
                >
                  {{ plan.price }}
                </h3>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="column is-12">
                <h3
                  class="title is-6 has-text-centered"
                  :style="{ color: plan.textColor }"
                >
                  {{ plan.currency }}
                </h3>
              </div>
            </div>
            <div class="columns is-centered is-mobile">
              <div class="column is-narrow">
                <button
                  class="button"
                  :style="{ 
                    'backgroundColor': plan.textColor,
                    'color': 'white',
                    'borderColor': plan.textColor,
                  }"
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import Vue from 'vue'
import Navbar from '../../components/Navbar'
export default Vue.extend({
  components: {
    Navbar,
  },
  data() {
    return {
      plans: [
        {
          id: 'estandar',
          price: '1000 USD',
          currency: 'Mensual',
          textColor: '#BA82B1',
          name: 'Estandar',
          color: '#E7BBD4',
        },
        {
          id: 'premium',
          price: '1000 USD',
          currency: 'Mensual',
          textColor: '#8878B9',
          name: 'Premium',
          color: '#D1B7DE',
        },
      ],
      usuarios: [
        '2 Usuarios',
        '5 Usuarios',
        'Ilimitados',
      ]
    }
  },
  methods: {
    GoRoute(param) {
      this.$router.push(param)
    },
  },
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}
#separator {
  padding: 5px;
}

.littleBox {
  padding: 5px;
  border: 1px solid #9A73B2;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.buttonsCurrency {
  color: #7A88C5 !important;
}
</style>
