<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  position: relative;
  margin-left: 30px;
}

.item::before {
  content: ' ';
  border-left: 1px solid var(--color-border);
  height: 50%;
  position: absolute;
  left: 0;
  top: 0;
}

.item::after {
  content: ' ';
  border-left: 1px solid var(--color-border);
  height: 50%;
  position: absolute;
  left: 0;
  bottom: 0;
}

.item:first-of-type:before {
  display: none;
}

.item:last-of-type:after {
  display: none;
}

i {
  color: var(--color-text);
  z-index: 10;
  min-width: 50px;
  transform: translateX(-50%);
  height: 50px;
  font-size: 2rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}
</style>

