<template>
<div>
<v-container class="pa-0">
    <v-navigation-drawer expand-on-hover
        rail  class="bg-blue h-100">
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Mughees Saad"
            subtitle="mughees_saad@gmailcom">
            
            
            </v-list-item>
            
        </v-list>
        <v-divider></v-divider>
          <v-list density="compact" nav>
        <router-link to="/dataDisplay" style="text-decoration:none">
          <v-list-item prepend-icon="mdi-home" title="Companies" value="Companies"></v-list-item>
        </router-link>
        </v-list>
        
    </v-navigation-drawer>
</v-container>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
