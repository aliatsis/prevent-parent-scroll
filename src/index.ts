export interface PreventParentMouseWheelEvent extends MouseWheelEvent {
  preventParentScroll: boolean;
  axis: number;
}


class PreventParentScroll {
  private handler: (event: PreventParentMouseWheelEvent) => void;

  constructor(public elem: HTMLElement) { }

  start() {
    this.handler = this.onMouseWheel.bind(this);
    this.elem.addEventListener('mousewheel', this.handler, false);
  }

  stop() {
    this.elem.removeEventListener('mousewheel', this.handler);
  }

  private onMouseWheel(event: PreventParentMouseWheelEvent) {
    if (event.preventParentScroll) {
      return;
    }

    let y = this.getDelta(event);

    if (y) {
      let outerHeight = this.elem.getBoundingClientRect().height;
      let computedStyle = window.getComputedStyle(this.elem);
      let borderTopWidth = parseFloat(computedStyle.borderTopWidth || '') || 0;
      let borderBottomWidth = parseFloat(computedStyle.borderBottomWidth || '') || 0;
      let elemScrollableHeight = outerHeight - borderTopWidth - borderBottomWidth;

      this.maybePreventMouseWheel(y, elemScrollableHeight, this.elem.scrollTop, this.elem.scrollHeight, event);
    }

    event.preventParentScroll = true;
  }

  private getDelta(event: PreventParentMouseWheelEvent, xAxis: boolean = false) {
    if (event.wheelDelta) { //for everything but firefox
      let delta = event.wheelDeltaY;

      if (xAxis) {
        delta = event.wheelDeltaX;
      }

      return delta;
    } else if (event.detail) { //for firefox pre version 17
      if (event.axis && ((event.axis === 1 && xAxis) || (event.axis === 2 && !xAxis))) {
        return -1 * event.detail * 12;
      }
    } else if (event.deltaMode) {
      if (xAxis) {
        return event.deltaX;
      } else {
        return event.deltaY;
      }
    }

    return 0;
  }

  private maybePreventMouseWheel(
    delta: number, elemLength: number, elemScroll: number, scrollLength: number, event: PreventParentMouseWheelEvent
  ) {
    if (delta < 0 && this.scrollIsMaxed(elemLength, elemScroll, scrollLength)) {
      event.preventDefault();
    } else if (delta > 0 && this.scrollIsMinned(elemScroll)) {
      event.preventDefault();
    }
  }

  private scrollIsMaxed(elemLength: number, elemScroll: number, scrollLength: number) {
    return elemLength + elemScroll === scrollLength;
  }

  private scrollIsMinned(elemScroll: number) {
    return elemScroll === 0;
  }
}


export default PreventParentScroll;