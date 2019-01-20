<template>
    <div class="container" >
        <div class="container mt-4" v-if="!$gate.isAdmin()">
            <not-found></not-found>
        </div>
        <div v-if="$gate.isAdmin()">
            <passport-clients></passport-clients>
            <passport-authorized-clients></passport-authorized-clients>
            <passport-personal-access-tokens></passport-personal-access-tokens>
        </div>
            
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
