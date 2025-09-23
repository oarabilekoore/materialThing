package cli

import (
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "mcd",
	Short: "mcd allows you to create new projects and manage existing ones",
}

func Execute() {
	cobra.CheckErr(rootCmd.Execute())
}
