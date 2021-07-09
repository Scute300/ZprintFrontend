<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="columns">
        <div
          v-for="tipo in tipos"
          class="column is-6">
          <div class="box">
            <div class="columns">
              <div class="column is-12">
                <div class="boxTitle">
                  <p class="title is-6">
                    {{ tipo.nombre }}
                  </p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="field has-addons">
                  <div class="control">
                    <input
                      v-model="myInput[tipo.id]"
                      class="input"
                      type="text"
                      :placeholder="`Agregar o buscar ${tipo.id}`"
                    />
                  </div>
                  <div class="control">
                    <a
                      v-if="edit.type !== '' && tipo.id == edit.type"
                      @click="editItem(edit.type, myInput[tipo.id])"
                      class="button is-success">
                      <i class="fas fa-edit" />
                    </a>
                    <a
                      v-else
                      @click="add(tipo.id, myInput[tipo.id])"
                      class="button is-success">
                      <i class="fas fa-save" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <TableMarcasyProductos
              :items="tipo.contenido"
              :filter="myInput[tipo.id]"
              :deleteI="deleteI"
              :tipo="tipo.id"
              :edit="onEditPress"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Navbar from '../../../components/Navbar'
import TableMarcasyProductos from '../../../components/MarcasYproductos'
export default Vue.extend({
  components: {
    Navbar,TableMarcasyProductos
  },
  mounted(){
    this.getInitials()
  },
  data() {
    return {
      myInput: {
        marca: '',
        departamento: '',
      },
      tipos : [
        {
          id: 'marca',
          nombre: 'Marcas',
          contenido: []
        },
        {
          id: 'departamento',
          nombre: 'Departamento',
          contenido: []
        }
      ],
      edit: {
        type: '',
        edit: '',
        index: ''
      }
    }
  },
  methods: {
    onEditPress(key, id, name, index){
      this.edit = {
        type: key,
        edit: id,
        index: index
      }
      this.myInput = {
        ...this.myInput,
        [key]: name
      }

    },
    add(type, nombreProduct){
      const token = JSON.parse(localStorage.getItem('token'))
      switch(type){
        case 'marca':
          this.$axios.put('/api/updateMarca/', {
            nombre: nombreProduct
          },  { headers: { Authorization: `Bearer ${token.token}` } })
            .then(response => {
              this.tipos[0].contenido.push({
                name: nombreProduct,
                id: response.data.id
              })
            })
        break;
        case 'departamento' :
          this.$axios.post('/api/newDepartamento', {
            nombre: nombreProduct
          },  { headers: { Authorization: `Bearer ${token.token}` } })
            .then(response => {
              this.tipos[1].contenido.push({
                name: nombreProduct,
                id: response.data.id
              })
            })
        break;
      }
    },
    editItem(type, nombreProduct){
      const token = JSON.parse(localStorage.getItem('token'))
      switch(type){
        case 'marca':
          this.$axios.put('/api/updateMarca/'+this.edit.edit, {
            nombre: nombreProduct
          },  { headers: { Authorization: `Bearer ${token.token}` } })
            .then(response => {
              this.tipos[0].contenido.splice(1, this.edit.index, {
                name: nombreProduct,
                id: response.data.id
              })
            })
        break;
        case 'departamento' :
          this.$axios.put('/api/updateDepartament/'+this.edit.edit, {
            nombre: nombreProduct
          },  { headers: { Authorization: `Bearer ${token.token}` } })
            .then(response => {
              this.tipos[1].contenido.splice(this.edit.index, 1, {
                name: nombreProduct,
                id: response.data.id
              })
            })
        break;
      }
    },
    getInitials(){
      const token = JSON.parse(localStorage.getItem('token'))
      this.$axios.get('/api/marcasydepartamentos',
        { headers: { Authorization: `Bearer ${token.token}` } }
      ).then(response => {
        const marcas = response.data?.marcas?.map( ( marca ) => {
          return {
            name: marca.name,
            id: marca.id
          }
        })  ;

        const departamentos = response.data?.departaments?.map( ( departament ) => {
          return {
            name: departament.name,
            id: departament.id
          }
        })

        this.tipos[0].contenido = marcas
        this.tipos[1].contenido = departamentos
      })
    },
    deleteI(type, id){
      const token = JSON.parse(localStorage.getItem('token'))
      switch(type){
        case 'marca' :
          this.$axios.delete('/api/eliminarMarca/'+id,
            { headers: { Authorization: `Bearer ${token.token}` } }
          ).then(response => {
              const newMarcaArray = this.tipos[0].contenido.filter( item => item.id !== id )
              this.tipos[0].contenido = newMarcaArray
          })
        break;
        case 'departamento':
          this.$axios.delete('/api/eliminarDepartamento/'+id,
            { headers: { Authorization: `Bearer ${token.token}` } }
          ).then(response => {
              const newMarcaArray = this.tipos[1].contenido.filter( item => item.id !== id )
              this.tipos[1].contenido = newMarcaArray
          })
        break;
      }
    }
  }
})
</script>

<style>
#mySpan {
  margin-left: 8px !important;
  font-size: 10px;
}

.boxTitle {
  border-bottom: 1px solid black;
  padding: 5px;
}
</style>
