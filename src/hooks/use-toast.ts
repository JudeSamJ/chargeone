<<<<<<< HEAD
"use client";

// Inspired by react-hot-toast library
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
=======
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
<<<<<<< HEAD
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};
=======
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
<<<<<<< HEAD
      };
=======
      }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
<<<<<<< HEAD
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;
=======
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
<<<<<<< HEAD
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
=======
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
<<<<<<< HEAD
      };
=======
      }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
<<<<<<< HEAD
        };
=======
        }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
<<<<<<< HEAD
      };
  }
};

const listeners = [];

let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast({ ...props }) {
  const id = genId();
=======
      }
  }
}

const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast({ ...props }) {
  const id = genId()
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
<<<<<<< HEAD
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
=======
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
<<<<<<< HEAD
        if (!open) dismiss();
      },
    },
  });
=======
        if (!open) dismiss()
      },
    },
  })
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  return {
    id: id,
    dismiss,
    update,
<<<<<<< HEAD
  };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
=======
  }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
<<<<<<< HEAD
  };
}

export { useToast, toast };
=======
  }
}

export { useToast, toast }
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
