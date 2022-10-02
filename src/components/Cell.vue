<template>
    <div class="cell-cont">
        <div class="cell">
        </div>
        <div draggable="true"
             @dragstart="dragStart"
             @click.middle="onRight"
             :class="[cell.className,{'vertical': !!cell?.ship?.ky,'wrong-dir': pressed}]" >

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, inject, PropType} from "vue";
    import {Cell as c, Cell} from "@/class/Cell";
    import {ElementPointData} from "@/hooks/utils";

    export default defineComponent({
        name: "CellComponent",
        data()  {
           return {
               pressed: false
        }
        },
        props: {
            cell:  {
                type: Cell,
                required: true
            },
            setElem: {
                type:Function as PropType<(elem : ElementPointData) => void>,
                required: true
            },
            onClick: {
                type: Function as PropType<(Cell: c) => boolean>,
                required: true
            },
            hide: {
                type:Function as PropType<(elem : c, b :boolean) => void>,
                required: true
            },
            selected: {
                type: Function as PropType<(Cell: c|null) => void>,
                required:true
            },
            check: {
                type: Function as PropType<() => void>,
                required: true
            }
        },
        methods: {
            dragStart(evt: DragEvent) {
                if (!evt.dataTransfer) {
                    return
                }
                evt.dataTransfer.setData("cell", this.cell.x + " " + this.cell.y)
                evt.dataTransfer.effectAllowed = 'move'
                this.check()
                this.selected(this.cell)
                if(evt.currentTarget) {
                    let i = (evt.currentTarget as HTMLDivElement).getBoundingClientRect()
                    let x = evt.clientX - i.x
                    let y = evt.clientY - i.y
                    this.hide(this.cell, false)
                    this.setElem({
                        x,
                        y,
                        height: i.height,
                        width: i.width
                    })
                }
            },
            onRight() {
                if(!this.onClick(this.cell) && !this.pressed) {
                    this.pressed = true
                    setTimeout(() => {
                        this.pressed = false
                    }, 1000)
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .cell-cont {
        position: relative;
    }
/*    .vertical {
        transform: rotate(90deg);
        transform-origin: 1.5rem 1.5rem;
    }*/
    .wrong-dir {
        background-color: red !important;
        transition: background-color 0.4s ease-in-out;
    }
    .d1 {
        background-color:#684ec9 ;
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(1 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
        &.vertical {
            height:calc(1 * 3rem + 2px) ;
            width: 3rem;
        }
    }
    .d2 {
        background-color:#684ec9 ;
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(2 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
        &.vertical {
            height:calc(2 * 3rem + 2px) ;
            width: 3rem;
        }
    }
    .d3 {
        background-color:#684ec9 ;
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(3 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
        &.vertical {
            height:calc(3 * 3rem + 2px) ;
            width: 3rem;
        }
    }
    .d4 {
        background-color:#684ec9 ;
        z-index: 3;
        position: absolute;
        cursor: move;
        top:0;
        left: 0;
        height: 3rem ;
        width: calc(4 * 3rem + 2px);
        border: solid #684ec9 3px;
        border-radius: 2px;
        &.vertical {
            height:calc(4 * 3rem + 2px) ;
            width: 3rem;
        }
    }
 .cell {
     z-index: 2;
     position: relative;
     width: calc(3rem);
     height:calc( 3rem);
     display: flex;
     border: 1px solid rgba(1,1,1,0.3);
     align-items: center;
     justify-content: center;
 }
 .shiped {
        background-color: red ;
    }
</style>