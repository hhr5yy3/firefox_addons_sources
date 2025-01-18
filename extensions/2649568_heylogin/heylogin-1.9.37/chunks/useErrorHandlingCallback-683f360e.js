import { r as reactExports } from "./ExtDebugVisibleContext-6460380f.js";
import { t as trackError } from "./message-939596d6.js";
function useErrorHandlingCallback(callback, deps) {
  return reactExports.useCallback((...args) => {
    (async () => {
      await callback(...args);
    })().catch(trackError);
  }, deps);
}
export {
  useErrorHandlingCallback as u
};
//# sourceMappingURL=useErrorHandlingCallback-683f360e.js.map
