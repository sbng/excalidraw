import {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
  NonDeleted,
} from "../element/types";
import { getNonDeletedElements } from "../element";

export interface SceneStateCallback {
  (): void;
}

export interface SceneStateCallbackRemover {
  (): void;
}

class GlobalScene {
  private callbacks: Set<SceneStateCallback> = new Set();

  constructor(private _elements: readonly ExcalidrawElement[] = []) {}

  getElement(
    id: ExcalidrawElement["id"],
  ): NonDeleted<ExcalidrawElement> | null {
    const element = this._elements.find(
      (element) => !element.isDeleted && element.id === id,
    );
    if (element) {
      return element as NonDeleted<ExcalidrawElement>;
    }
    return null;
  }

  getElementsIncludingDeleted() {
    return this._elements;
  }

  getElements(): readonly NonDeletedExcalidrawElement[] {
    return getNonDeletedElements(this._elements);
  }

  replaceAllElements(nextElements: readonly ExcalidrawElement[]) {
    this._elements = nextElements;
    this.informMutation();
  }

  informMutation() {
    for (const callback of Array.from(this.callbacks)) {
      callback();
    }
  }

  addCallback(cb: SceneStateCallback): SceneStateCallbackRemover {
    if (this.callbacks.has(cb)) {
      throw new Error();
    }

    this.callbacks.add(cb);

    return () => {
      if (!this.callbacks.has(cb)) {
        throw new Error();
      }
      this.callbacks.delete(cb);
    };
  }
}

export const globalSceneState = new GlobalScene();
