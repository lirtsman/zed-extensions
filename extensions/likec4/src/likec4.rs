use std::fs;
use zed_extension_api::{self as zed, LanguageServerId, Result};

struct LikeC4Extension {
    cached_binary_path: Option<String>,
}

impl LikeC4Extension {
    fn language_server_binary_path(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<String> {
        // First, check if likec4-language-server is available in PATH
        if let Some(path) = worktree.which("likec4-language-server") {
            return Ok(path);
        }

        // Check if we have a cached path that still exists
        if let Some(path) = &self.cached_binary_path {
            if fs::metadata(path).map_or(false, |stat| stat.is_file()) {
                return Ok(path.clone());
            }
        }

        // Install the language server via npm
        zed::set_language_server_installation_status(
            language_server_id,
            &zed::LanguageServerInstallationStatus::CheckingForUpdate,
        );

        // Get the latest version from npm
        let version = zed::npm_package_latest_version("@likec4/language-server")?;
        let package_dir = format!("likec4-lsp-{version}");
        let binary_path = format!("{package_dir}/node_modules/.bin/likec4-language-server");

        // Check if already installed
        if fs::metadata(&binary_path).map_or(false, |stat| stat.is_file()) {
            self.cached_binary_path = Some(binary_path.clone());
            return Ok(binary_path);
        }

        zed::set_language_server_installation_status(
            language_server_id,
            &zed::LanguageServerInstallationStatus::Downloading,
        );

        // Install the package
        let result = zed::npm_install_package("@likec4/language-server", &version);
        match result {
            Ok(()) => {
                // Clean up old versions
                if let Ok(entries) = fs::read_dir(".") {
                    for entry in entries.flatten() {
                        let name = entry.file_name();
                        let name_str = name.to_string_lossy();
                        if name_str.starts_with("likec4-lsp-") && name_str != package_dir {
                            fs::remove_dir_all(entry.path()).ok();
                        }
                    }
                }

                self.cached_binary_path = Some(binary_path.clone());
                Ok(binary_path)
            }
            Err(e) => Err(format!("Failed to install @likec4/language-server: {e}")),
        }
    }
}

impl zed::Extension for LikeC4Extension {
    fn new() -> Self {
        Self {
            cached_binary_path: None,
        }
    }

    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        let binary_path = self.language_server_binary_path(language_server_id, worktree)?;

        Ok(zed::Command {
            command: binary_path,
            args: vec!["--stdio".to_string()],
            env: Default::default(),
        })
    }

    fn label_for_completion(
        &self,
        _language_server_id: &LanguageServerId,
        completion: zed::lsp::Completion,
    ) -> Option<zed::CodeLabel> {
        let label = &completion.label;
        let kind = completion.kind?;

        use zed::lsp::CompletionKind;

        let highlight_end = label.len();

        match kind {
            CompletionKind::Keyword => Some(zed::CodeLabel {
                code: label.clone(),
                spans: vec![zed::CodeLabelSpan::code_range(0..highlight_end)],
                filter_range: (0..highlight_end).into(),
            }),
            CompletionKind::Property | CompletionKind::Field => {
                let code = format!("{label}: value");
                Some(zed::CodeLabel {
                    code,
                    spans: vec![zed::CodeLabelSpan::code_range(0..highlight_end)],
                    filter_range: (0..highlight_end).into(),
                })
            }
            CompletionKind::Class | CompletionKind::Struct | CompletionKind::Module => {
                let code = format!("element {label}");
                let start = "element ".len();
                Some(zed::CodeLabel {
                    code,
                    spans: vec![zed::CodeLabelSpan::code_range(start..start + highlight_end)],
                    filter_range: (0..highlight_end).into(),
                })
            }
            CompletionKind::Function => {
                let code = format!("view {label}");
                let start = "view ".len();
                Some(zed::CodeLabel {
                    code,
                    spans: vec![zed::CodeLabelSpan::code_range(start..start + highlight_end)],
                    filter_range: (0..highlight_end).into(),
                })
            }
            CompletionKind::Enum | CompletionKind::EnumMember | CompletionKind::Color => {
                Some(zed::CodeLabel {
                    code: label.clone(),
                    spans: vec![zed::CodeLabelSpan::code_range(0..highlight_end)],
                    filter_range: (0..highlight_end).into(),
                })
            }
            CompletionKind::Variable | CompletionKind::Reference => Some(zed::CodeLabel {
                code: label.clone(),
                spans: vec![zed::CodeLabelSpan::code_range(0..highlight_end)],
                filter_range: (0..highlight_end).into(),
            }),
            _ => None,
        }
    }
}

zed::register_extension!(LikeC4Extension);
