import { EffectCallback, DependencyList } from "react";

let prevDeps: DependencyList | undefined = undefined;
let prevCleanup: any = undefined;
let hasRan = false;

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  function _hasChanged(prev: DependencyList = [], curr: DependencyList = []) {
    for (let i = 0; i < prev.length; i++) {
      const prevValue = prev[i];
      const currValue = curr[i];
      if (currValue !== prevValue) return true;
    }
    return false;
  }
  const hasChanged = _hasChanged(prevDeps, deps) || !hasRan;
  prevDeps = deps;
  if (hasChanged) {
    prevCleanup?.();
    prevCleanup = effect();
  }
  if (!hasRan) hasRan = true;
}
