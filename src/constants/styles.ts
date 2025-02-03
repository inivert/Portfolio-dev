export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
} as const

export const TRANSITIONS = {
  hover: 'transition-all duration-300',
  scale: 'hover:scale-110',
  fade: 'hover:opacity-90',
} as const

export const COMMON_STYLES = {
  button: {
    base: 'inline-flex h-10 items-center justify-center rounded-md',
    primary: 'px-8 text-sm font-medium text-white',
  },
  container: {
    dialog: 'sm:max-w-[800px] overflow-y-auto max-h-[90vh] overflow-x-hidden p-6',
  },
  text: {
    gradient: 'bg-clip-text text-transparent',
  },
  scrollbar: {
    hide: 'scrollbar-hide',
    custom: 'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent',
  },
} as const

// Add to globals.css:
export const GLOBAL_STYLES = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Prevent content shift when dialog opens */
  html.dialog-open {
    overflow-y: scroll !important;
    padding-right: var(--removed-body-scroll-bar-size, 0) !important;
  }
` 