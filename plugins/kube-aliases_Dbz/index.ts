const plugin: TUG.Plugin = {
  icon: "🧊",
  name: "kube-aliases_Dbz",
  displayName: "Kube Aliases",
  type: "shell",
  description: "Kubernetes Aliases and Bash Functions",
  authors: [
    {
      name: "Dbz",
      github: "Dbz",
    },
  ],
  github: "Dbz/kube-aliases",
  docs: "https://github.com/Dbz/kube-aliases/blob/master/docs/usage",
  license: ["MIT"],
  shells: ["zsh", "bash"],
  categories: ["Alias"],
  keywords: [
    "bash",
    "kubernetes",
    "zsh",
    "zsh-plugin",
    "shell",
    "oh-my-zsh-plugin",
    "oh-my-zsh",
    "k8s",
    "kubernetes-commands",
    "command-line-tool",
    "kubectl",
    "kubernetes-metrics-server",
    "autocomplete",
    "namespace-switching",
    "switching-contexts",
    "metrics",
    "cluster",
    "namespace",
    "devops",
  ],
  installation: {
    origin: "github",
    sourceFiles: ["kube-aliases.plugin.zsh"],
  },
};

export default plugin;
