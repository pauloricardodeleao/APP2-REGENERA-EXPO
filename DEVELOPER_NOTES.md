# REGENERA BANK - CORE TRANSACTION SERVICE (DEVOPS)

## EXPO ORBIT / ANDROID SDK RESOLUTION

Para resolver o erro de detecção de dispositivo no macOS (Expo Orbit):

1. **Configuração de Variáveis de Ambiente**:
   Adicione ao seu `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
2. **Refresh de Shell**:
   `source ~/.zshrc`
3. **Autorização de Chave RSA**:
   - Conecte o dispositivo via USB.
   - Execute `adb kill-server` seguido de `adb devices`.
   - Olhe para a tela do celular e marque "Sempre permitir deste computador" ao aceitar a chave RSA.
4. **Build Local**:
   `pnpm run build` na raiz do monorepo para garantir a integridade dos pacotes.

## STATUS DA COMPILAÇÃO (EAS CLOUD)
- **APK**: `app-release.apk` gerado com sucesso.
- **Assinatura**: Keystore V2/V3 injetada e validada.
- **Versão**: 20.7.3 (Gold Master).

## ESTRUTURA DO MONOREPO
- `apps/mobile-app`: Entry point da aplicação React Native / Web.
- `packages/core`: Domínio financeiro e modelos (Pure Cents Logic).
- `packages/ui`: Componentes atômicos e Glassmorphism.
- `packages/utils`: Validadores e formatadores.
