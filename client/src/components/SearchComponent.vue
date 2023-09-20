<template>
  <input
    class="hov flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none"
    placeholder="What do you want to listen to?"
    value=""
    type="text"
  />
</template>

<script>
export default {};
</script>

<style scoped>
.hov {
  border: 2px;
  color: whitesmoke;
}
input:hover {
  border-style: solid;
  border-color: whitesmoke;
}
.hov:hover {
  border-style: solid;
  border-color: whitesmoke;
}
</style>
