import * as i0 from '@angular/core';
import { Component, Input, ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class Button3dComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.title = 'Click';
        this.title_loading = 'Loading..';
        this.title_loading_success = 'Succes';
        this.height = '30px';
        this.width = '';
        this.raise = 5;
        this.rounded = '20px';
        // @Input() rotate ='';
        // @Input() rotate_invers ='';
        this.border = '';
        this.border_style = '';
        this.bg_front_color = '';
        this.bg_shadow_color = '';
        this.bg_back_color = '';
        this.font_color = '';
        this.font_body_weight = '';
        this.font_size = '';
        // @Input() loading: boolean;
        this.loading_type = ''; //slideInLeft
        this.loading = false; //slideInLeft
        this.loading_time = 500; //slideInLeft
        this.type = ''; //slideInLeft
        this.ripple = true;
        // this.loading=false;
    }
    //native of angular //when loading change
    ngOnChanges(changes) {
        if (this.loading_type !== '') {
            if (changes['loading']) {
                const loading = changes['loading'].currentValue;
                const previousValue = changes['loading'].previousValue;
                if (loading !== previousValue && previousValue !== undefined) {
                    // La propiedad 'loading' ha cambiado
                    // Puedes realizar acciones aquí cuando se detecte un cambio en 'loading'
                    const myButton = this.btn.nativeElement;
                    const bubble = myButton.querySelector('.bubble');
                    const childElement = myButton.querySelector('.btn_loading_wrapp');
                    let txt_loaded = childElement.querySelector('.txt_loaded');
                    let txt_loading = childElement.querySelector('.txt_loading');
                    childElement.classList.remove('hidden');
                    if (!loading) {
                        txt_loaded.classList.remove('hidden');
                        txt_loading.classList.add('hidden');
                        if (this.loading_type === 'waves') {
                            bubble.classList.remove('hidden');
                        }
                        setTimeout(function () {
                            childElement.classList.add('opacity-0');
                            childElement.classList.remove('flex', 'btn_loading_slideInLeft');
                        }, 600);
                        myButton.style.pointerEvents = "auto";
                    }
                    else {
                        myButton.style.pointerEvents = "none";
                        txt_loaded.classList.add('hidden');
                        txt_loading.classList.remove('hidden');
                        childElement.classList.remove('opacity-0');
                        childElement.classList.add('flex');
                        if (this.loading_type === 'waves') {
                            bubble.classList.add('flex');
                            // Código a ejecutar si loading_type es 'waves'
                            const water = myButton.querySelector(".water");
                            let percent = 0;
                            let x = 160;
                            const interval = setInterval(() => {
                                percent++;
                                water.style.transform = 'translate(0, ' + (100 - percent) + '%)';
                                if (percent === x) {
                                    clearInterval(interval);
                                }
                            }, 10);
                        }
                        if (this.loading_type === 'slideInLeft') {
                            childElement.classList.add('btn_loading_slideInLeft');
                        }
                    }
                }
            }
        }
    }
    loadWaves() { }
    // //with rxjs
    // private loadingSubject = new BehaviorSubject<boolean>(false);
    // loading$ = this.loadingSubject.asObservable().pipe(distinctUntilChanged());
    // @Input()
    // set loading(value: boolean) {
    //   console.log('eeeeeee',value);
    //     this.loadingSubject.next(value);
    // }
    ngOnInit() {
        // this.loading=false;
        //loading change
        // function handleMouseOut(event) {
        //   // Código para manejar el evento 'mouseout'
        // }
        /*
        const height = 200; // Altura del elemento
        const width = 300; // Ancho del elemento
    
        // Calcular el ángulo en radianes
        const angleRadians = Math.atan(height / width);
    
        // Convertir el ángulo a grados
        const angleDegrees = angleRadians * (180 / Math.PI);
    
        // Ajustar el ángulo a 10 grados
        const adjustedAngleDegrees = 10;
    
        // Calcular la nueva altura en base al ángulo ajustado
        const newHeight = Math.tan(adjustedAngleDegrees * (Math.PI / 180)) * width;
    
        console.log("Nueva altura:", newHeight);
         */
    }
    ngAfterViewInit() {
        // this.btn.forEach((btn2) => {
        const btn = this.btn.nativeElement;
        const style = this.btn.nativeElement.style;
        style.setProperty('--height', this.height !== '' ? this.height : '');
        style.setProperty('--width', this.width !== '' ? this.width : '');
        style.setProperty('--rounded', this.rounded !== '' ? this.rounded : '');
        style.setProperty('--border', this.border !== '' ? this.border : '');
        style.setProperty('--border_style', this.border_style !== '' ? this.border_style : '');
        style.setProperty('--bg_front_color', this.bg_front_color !== '' ? this.bg_front_color : '');
        style.setProperty('--bg_shadow_color', this.bg_shadow_color !== '' ? this.bg_shadow_color : '');
        style.setProperty('--bg_back_color', this.bg_back_color !== '' ? this.bg_back_color : '');
        style.setProperty('--font_color', this.font_color !== '' ? this.font_color : '');
        style.setProperty('--font_size', this.font_size !== '' ? this.font_size : '');
        style.setProperty('--raise', this.raise + 'px');
        let raise = this.raise;
        if (raise > 0) {
            btn.addEventListener('mousemove', event => {
                const width = btn.offsetWidth;
                const height = btn.offsetHeight;
                let rotationDegrees = Math.atan((height * (raise + raise)) / (width));
                const btnWidth = btn.offsetWidth;
                const mouseX = event.clientX - btn.getBoundingClientRect().left;
                // @ts-ignore
                style.setProperty('--rotate', rotationDegrees);
                // @ts-ignore
                style.setProperty('--rotate_invers', rotationDegrees * -1);
                let btn_frt = btn.querySelector('.btn_front');
                var rotate_Y = -10 * ((mouseX - btnWidth / 2) / (btnWidth / 2));
                if (rotate_Y > 2) {
                    btn.classList.remove('btn_shadow_default', 'btn_shadow_left');
                    btn.classList.add('btn_shadow_right');
                    btn_frt.classList.remove('btn_front_default', 'btn_front_right');
                    btn_frt.classList.add('btn_front_left');
                }
                if (rotate_Y > -2 && rotate_Y < 2) {
                    btn.classList.remove('btn_shadow_right', 'btn_shadow_left');
                    btn.classList.add('btn_shadow_default');
                    btn_frt.classList.remove('btn_front_right', 'btn_front_left');
                    btn_frt.classList.add('btn_front_default');
                }
                if (rotate_Y < -2) {
                    btn.classList.remove('btn_shadow_right', 'btn_shadow_default');
                    btn.classList.add('btn_shadow_left');
                    btn_frt.classList.remove('btn_front_default', 'btn_front_left');
                    btn_frt.classList.add('btn_front_right');
                }
            });
        }
        else {
            style.setProperty('--bg_shadow_color', 'transparent');
        }
        // });
    }
    /* ripple effect */
    handleButtonClick(event) {
        if (this.ripple) {
            this.removeRippleEffect();
            const btn = this.elementRef.nativeElement.querySelector('.ripple-button');
            // const btn = this.btn.nativeElement;
            // btn.addClass('ripple-button')
            const circle = this.renderer.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;
            const rect = btn.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            this.renderer.setStyle(circle, 'width', `${diameter}px`);
            this.renderer.setStyle(circle, 'height', `${diameter}px`);
            this.renderer.setStyle(circle, 'left', `${offsetX - radius}px`);
            this.renderer.setStyle(circle, 'top', `${offsetY - radius}px`);
            this.renderer.addClass(circle, 'ripple');
            this.renderer.appendChild(btn, circle);
        }
    }
    removeRippleEffect() {
        const btn = this.elementRef.nativeElement.querySelector('.ripple-button');
        const ripple = btn.querySelector('.ripple');
        if (ripple) {
            this.renderer.removeChild(btn, ripple);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: Button3dComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: Button3dComponent, isStandalone: true, selector: "button3d", inputs: { title: "title", title_loading: "title_loading", title_loading_success: "title_loading_success", height: "height", width: "width", raise: "raise", rounded: "rounded", border: "border", border_style: "border_style", bg_front_color: "bg_front_color", bg_shadow_color: "bg_shadow_color", bg_back_color: "bg_back_color", font_color: "font_color", font_body_weight: "font_body_weight", font_size: "font_size", loading_type: "loading_type", loading: "loading", loading_time: "loading_time", type: "type", ripple: "ripple" }, viewQueries: [{ propertyName: "btn", first: true, predicate: ["btn"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<h1 class=\"text-3xl font-bold underline\">\n  Hello world!\n</h1>\n<button #btn class=\"flex justify-center btn btn_shadow btn_loading flex-nowrap overflow-x-hidden {{type}}\" (click)=\"handleButtonClick($event)\">\n  <div class=\"btn_back\">\n    <div class=\"btn_front\" [ngClass]=\"\n    {\n    'cursor-not-allowed ': loading,\n    'ripple-button': ripple\n    }\">\n      <ng-content></ng-content>\n      <div *ngIf=\"loading_type!==''\" class=\"btn_loading_wrapp opacity-0 \">\n        <div *ngIf=\"loading_type=='waves'\" class=\"bubble \">\n          <div id=\"water\" class=\"water\">\n            <svg viewBox=\"0 0 560 40\" class=\"water_wave water_wave_back\">\n              <path d=\"M140 20C70 20 70 0 0 0V40H560V0C490 0 490 20 420 20C350 20 350 0 280 0C210 0 210 20 140 20Z\" />\n            </svg>\n            <svg viewBox=\"0 0 560 40\" class=\"water_wave water_wave_front\">\n              <path d=\"M140 20C70 20 70 0 0 0V40H560V0C490 0 490 20 420 20C350 20 350 0 280 0C210 0 210 20 140 20Z\" />\n            </svg>\n            <div class=\"liquid\">\n            </div>\n          </div>\n        </div>\n        <p class=\"txt_loading\">{{title_loading}}</p>\n        <p class=\"txt_loaded hidden\">{{title_loading_success}}</p>\n      </div>\n      <p *ngIf=\"title!==''\">{{title}}</p>\n    </div>\n  </div>\n</button>\n\n", styles: ["button{all:unset}.gap-10{gap:35px}.btn{--height: 100px;--width:100px;--raise: 0px;--rounded: var(--rounded-sm);--rotate: 0;--rotate_invers: 0;--border:4px;--border_style:solid #004c65 var(--border);--bg_front_color: #AAD3EA;--bg_front_color_hover: rgba(170, 211, 234, .08);--bg_shadow_color: #4B4B4B84;--bg_back_color: #004c65;--font_color: white;--font_body_weight:800;--font_size:14px}.btn{font-weight:var(--font_body_weight);font-size:var(--font_size)}.btn_shadow{position:relative;height:calc(var(--height) + var(--raise));width:var(--width);color:var(--font_color)}.btn_shadow:before{content:\" \";position:absolute;top:0;height:var(--height);margin-top:calc(var(--raise) + (var(--raise)/1.2));width:var(--width);background:var(--bg_shadow_color);border-radius:var(--rounded);transition:transform .2s ease-out}.btn_shadow .btn_back{width:var(--width)}.btn_shadow .btn_back:before{content:\" \";position:absolute;top:0;height:var(--height);margin-top:var(--raise);width:var(--width);background:var(--bg_back_color);border-radius:var(--rounded);transition:transform .1s ease-out}.btn_shadow .btn_front{position:absolute;height:calc(var(--height));width:var(--width);top:0;background:var(--bg_front_color);display:flex;align-items:center;justify-content:center;border-radius:var(--rounded);border:var(--border_style);transition:transform .1s ease-out}.btn:active{opacity:.8}.btn_shadow_left:before{transition:transform .2s ease-out;transform:skewY(calc(1deg * var(--rotate_invers)))}.btn_shadow_right:before{transition:transform .2s ease-out;transform:skewY(calc(1deg * var(--rotate)))}.btn_shadow_default:before{transform:skew(0) translateZ(0)}.btn_shadow_default:hover:before{transform:translateY(-5px)}.btn_shadow_default:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_shadow_left:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_shadow_right:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_front_left{transform:skewY(calc(1deg * var(--rotate_invers)))}.btn_front_right{transform:skewY(calc(1deg * var(--rotate)));transition:transform .2s ease-out}.btn_front_default{transform:skew(0) translateZ(0);transition:transform .2s ease-out}.btn_front_left:active,.btn_front_right:active{transform:skewY(0) translateY(var(--raise))}.btn_front_default:hover{transform:translateY(calc(var(--raise) * .5))}.btn_front_default:active{transform:skewY(0) translateY(var(--raise))}.btn_loading_wrapp{position:absolute;height:var(--height);width:var(--width);margin-left:calc(var(--border)*-1);margin-right:calc(var(--border)*-1);background:var(--bg_back_color);align-items:center;justify-content:center;border-radius:var(--rounded);border:var(--border_style);overflow:hidden;z-index:1}.btn_loading_wrapp:before{content:\" \";position:absolute;height:var(--height);width:0;left:0;right:0;background:var(--bg_front_color);z-index:-1}.btn_loading_slideInLeft:before{width:100%;transition:width 1s ease-in}.btn_loading_wrapp .txt_loading{animation:slide-up .5s ease-in-out;position:absolute}.btn_loading_wrapp .txt_loaded{animation:slide-down .5s ease-in-out;position:absolute}@keyframes slide-down{0%{transform:translateY(-150%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slide-up{0%{transform:translateY(150%);opacity:0}to{transform:translateY(0);opacity:1}}.bubble{width:100%;height:100%;background-color:transparent;overflow:hidden;transform:translate(0);border-radius:calc(var(--rounded) - 10)}.bubble .water{position:absolute;background-color:transparent;left:0;top:0;z-index:2;width:100%;height:100%;-webkit-transform:translate(0,100%);transform:translateY(100%)}.bubble .water_wave_back{width:200%;left:0;top:0;position:relative;fill:var(--bg_front_color);opacity:.7;animation:wave-back .8s infinite linear}.bubble .water_wave_front{margin-top:8px;width:200%;left:0;top:0;position:absolute;fill:var(--bg_front_color);animation:wave-front .6s infinite linear}.liquid{background:var(--bg_front_color);width:100%;height:150%;margin-top:-6px}@keyframes wave-front{to{transform:translate(-50%)}}@keyframes wave-back{to{transform:translate(-50%)}}.mdc-line-ripple{display:none}.ripple-button{position:relative;overflow:hidden}.ripple{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#ffffff6b;transform:scale(0);animation:rippleEffect .7s;overflow:hidden}@keyframes rippleEffect{to{transform:scale(2);opacity:0}}\n", ".btn_primary{--border_style:solid #b84a41 var(--border);--bg_front_color: #338a9d;--bg_shadow_color: #4B4B4B20;--bg_back_color: #9a453f;--font_color: #ea893e}.btn_secondary{--bg_shadow_color: #4B4B4B84;--bg_front_color: #fffbb5;--bg_back_color: #4e6a6b;--border_style:solid #5c8486 var(--border);--font_color: #20201e}.btn_anchor{--border_style:solid #404040 var(--border);--bg_front_color: #ececec;--bg_shadow_color: #4B4B4B84;--bg_back_color: #313131;--font_color: #7f4997}.btn_danger{--border_style:solid #d2f3af var(--border);--bg_front_color: #8B3357;--bg_shadow_color: #4B4B4B84;--bg_back_color: #afca92;--font_color: #fff}.btn_disabled{--border_style:solid #9dd6dd var(--border);--bg_front_color: #f16c5d;--bg_shadow_color: #4B4B4B84;--bg_back_color: #7da7ac;--font_color: #ececec}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: ReactiveFormsModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: Button3dComponent, decorators: [{
            type: Component,
            args: [{ imports: [
                        NgClass,
                        NgIf,
                        FormsModule,
                        ReactiveFormsModule,
                    ], selector: 'button3d', standalone: true, template: "<h1 class=\"text-3xl font-bold underline\">\n  Hello world!\n</h1>\n<button #btn class=\"flex justify-center btn btn_shadow btn_loading flex-nowrap overflow-x-hidden {{type}}\" (click)=\"handleButtonClick($event)\">\n  <div class=\"btn_back\">\n    <div class=\"btn_front\" [ngClass]=\"\n    {\n    'cursor-not-allowed ': loading,\n    'ripple-button': ripple\n    }\">\n      <ng-content></ng-content>\n      <div *ngIf=\"loading_type!==''\" class=\"btn_loading_wrapp opacity-0 \">\n        <div *ngIf=\"loading_type=='waves'\" class=\"bubble \">\n          <div id=\"water\" class=\"water\">\n            <svg viewBox=\"0 0 560 40\" class=\"water_wave water_wave_back\">\n              <path d=\"M140 20C70 20 70 0 0 0V40H560V0C490 0 490 20 420 20C350 20 350 0 280 0C210 0 210 20 140 20Z\" />\n            </svg>\n            <svg viewBox=\"0 0 560 40\" class=\"water_wave water_wave_front\">\n              <path d=\"M140 20C70 20 70 0 0 0V40H560V0C490 0 490 20 420 20C350 20 350 0 280 0C210 0 210 20 140 20Z\" />\n            </svg>\n            <div class=\"liquid\">\n            </div>\n          </div>\n        </div>\n        <p class=\"txt_loading\">{{title_loading}}</p>\n        <p class=\"txt_loaded hidden\">{{title_loading_success}}</p>\n      </div>\n      <p *ngIf=\"title!==''\">{{title}}</p>\n    </div>\n  </div>\n</button>\n\n", styles: ["button{all:unset}.gap-10{gap:35px}.btn{--height: 100px;--width:100px;--raise: 0px;--rounded: var(--rounded-sm);--rotate: 0;--rotate_invers: 0;--border:4px;--border_style:solid #004c65 var(--border);--bg_front_color: #AAD3EA;--bg_front_color_hover: rgba(170, 211, 234, .08);--bg_shadow_color: #4B4B4B84;--bg_back_color: #004c65;--font_color: white;--font_body_weight:800;--font_size:14px}.btn{font-weight:var(--font_body_weight);font-size:var(--font_size)}.btn_shadow{position:relative;height:calc(var(--height) + var(--raise));width:var(--width);color:var(--font_color)}.btn_shadow:before{content:\" \";position:absolute;top:0;height:var(--height);margin-top:calc(var(--raise) + (var(--raise)/1.2));width:var(--width);background:var(--bg_shadow_color);border-radius:var(--rounded);transition:transform .2s ease-out}.btn_shadow .btn_back{width:var(--width)}.btn_shadow .btn_back:before{content:\" \";position:absolute;top:0;height:var(--height);margin-top:var(--raise);width:var(--width);background:var(--bg_back_color);border-radius:var(--rounded);transition:transform .1s ease-out}.btn_shadow .btn_front{position:absolute;height:calc(var(--height));width:var(--width);top:0;background:var(--bg_front_color);display:flex;align-items:center;justify-content:center;border-radius:var(--rounded);border:var(--border_style);transition:transform .1s ease-out}.btn:active{opacity:.8}.btn_shadow_left:before{transition:transform .2s ease-out;transform:skewY(calc(1deg * var(--rotate_invers)))}.btn_shadow_right:before{transition:transform .2s ease-out;transform:skewY(calc(1deg * var(--rotate)))}.btn_shadow_default:before{transform:skew(0) translateZ(0)}.btn_shadow_default:hover:before{transform:translateY(-5px)}.btn_shadow_default:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_shadow_left:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_shadow_right:active:before{transform:translateY(calc((var(--raise)/1.2) * -1))}.btn_front_left{transform:skewY(calc(1deg * var(--rotate_invers)))}.btn_front_right{transform:skewY(calc(1deg * var(--rotate)));transition:transform .2s ease-out}.btn_front_default{transform:skew(0) translateZ(0);transition:transform .2s ease-out}.btn_front_left:active,.btn_front_right:active{transform:skewY(0) translateY(var(--raise))}.btn_front_default:hover{transform:translateY(calc(var(--raise) * .5))}.btn_front_default:active{transform:skewY(0) translateY(var(--raise))}.btn_loading_wrapp{position:absolute;height:var(--height);width:var(--width);margin-left:calc(var(--border)*-1);margin-right:calc(var(--border)*-1);background:var(--bg_back_color);align-items:center;justify-content:center;border-radius:var(--rounded);border:var(--border_style);overflow:hidden;z-index:1}.btn_loading_wrapp:before{content:\" \";position:absolute;height:var(--height);width:0;left:0;right:0;background:var(--bg_front_color);z-index:-1}.btn_loading_slideInLeft:before{width:100%;transition:width 1s ease-in}.btn_loading_wrapp .txt_loading{animation:slide-up .5s ease-in-out;position:absolute}.btn_loading_wrapp .txt_loaded{animation:slide-down .5s ease-in-out;position:absolute}@keyframes slide-down{0%{transform:translateY(-150%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slide-up{0%{transform:translateY(150%);opacity:0}to{transform:translateY(0);opacity:1}}.bubble{width:100%;height:100%;background-color:transparent;overflow:hidden;transform:translate(0);border-radius:calc(var(--rounded) - 10)}.bubble .water{position:absolute;background-color:transparent;left:0;top:0;z-index:2;width:100%;height:100%;-webkit-transform:translate(0,100%);transform:translateY(100%)}.bubble .water_wave_back{width:200%;left:0;top:0;position:relative;fill:var(--bg_front_color);opacity:.7;animation:wave-back .8s infinite linear}.bubble .water_wave_front{margin-top:8px;width:200%;left:0;top:0;position:absolute;fill:var(--bg_front_color);animation:wave-front .6s infinite linear}.liquid{background:var(--bg_front_color);width:100%;height:150%;margin-top:-6px}@keyframes wave-front{to{transform:translate(-50%)}}@keyframes wave-back{to{transform:translate(-50%)}}.mdc-line-ripple{display:none}.ripple-button{position:relative;overflow:hidden}.ripple{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#ffffff6b;transform:scale(0);animation:rippleEffect .7s;overflow:hidden}@keyframes rippleEffect{to{transform:scale(2);opacity:0}}\n", ".btn_primary{--border_style:solid #b84a41 var(--border);--bg_front_color: #338a9d;--bg_shadow_color: #4B4B4B20;--bg_back_color: #9a453f;--font_color: #ea893e}.btn_secondary{--bg_shadow_color: #4B4B4B84;--bg_front_color: #fffbb5;--bg_back_color: #4e6a6b;--border_style:solid #5c8486 var(--border);--font_color: #20201e}.btn_anchor{--border_style:solid #404040 var(--border);--bg_front_color: #ececec;--bg_shadow_color: #4B4B4B84;--bg_back_color: #313131;--font_color: #7f4997}.btn_danger{--border_style:solid #d2f3af var(--border);--bg_front_color: #8B3357;--bg_shadow_color: #4B4B4B84;--bg_back_color: #afca92;--font_color: #fff}.btn_disabled{--border_style:solid #9dd6dd var(--border);--bg_front_color: #f16c5d;--bg_shadow_color: #4B4B4B84;--bg_back_color: #7da7ac;--font_color: #ececec}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: i0.ElementRef }], propDecorators: { title: [{
                type: Input
            }], title_loading: [{
                type: Input
            }], title_loading_success: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], raise: [{
                type: Input
            }], rounded: [{
                type: Input
            }], border: [{
                type: Input
            }], border_style: [{
                type: Input
            }], bg_front_color: [{
                type: Input
            }], bg_shadow_color: [{
                type: Input
            }], bg_back_color: [{
                type: Input
            }], font_color: [{
                type: Input
            }], font_body_weight: [{
                type: Input
            }], font_size: [{
                type: Input
            }], loading_type: [{
                type: Input
            }], loading: [{
                type: Input
            }], loading_time: [{
                type: Input
            }], type: [{
                type: Input
            }], ripple: [{
                type: Input
            }], btn: [{
                type: ViewChild,
                args: ['btn']
            }] } });

/*
 * Public API Surface of button3d
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Button3dComponent };
//# sourceMappingURL=button3d.mjs.map
