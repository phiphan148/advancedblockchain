<template>
    <div>
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper" @click="$emit('close')">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "modal",
    }
</script>

<style scoped>
    @media only screen and (max-width: 575px) {
        .modal-container {
            width: 100% !important;
        }
    }

    @media only screen and (min-width: 991px) {
        .modal-container {
            width: 30% !important;
        }
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5) !important;
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 50%;
        margin: 0px auto;
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-header{
        border-bottom: none !important;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .close-img{
        float: right;
        color: white;
        font-size: 25px;
    }
</style>