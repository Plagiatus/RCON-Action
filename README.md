# RCON-Action

Integrate RCON actions into your github workflow.

Originally created and intended to be used for a more automated use of minecraft datapacks, in tandem with the [FTP Deploy](https://github.com/marketplace/actions/ftp-deploy) action. See [this file](https://github.com/Plagiatus/YeggsMapjam2021/blob/main/.github/workflows/main.yml) for a working example of a combination of these two.

To set up with your Minecraft Server via FTP, copy the [linked example file](https://github.com/Plagiatus/YeggsMapjam2021/blob/main/.github/workflows/main.yml) to `your_repository/.github/workflow/main.yml`, update and add the [secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) to your repository and you're ready to go. That is if your server has both FTP and RCON enabled.

## Example Action File

[File in this repository](https://github.com/Plagiatus/RCON-Action/blob/main/.github/workflows/main.yml)


```yml
name: RCON Test

on: 
  push:
    branches: [ main ]

  workflow_dispatch:

jobs:
  rcon_test:
    runs-on: ubuntu-latest
    name: RCON Test
    steps:
      - name: RCON Connection
        uses: Plagiatus/RCON-Action@v0.1
        with:
          server: ${{ secrets.rcon_server }}
          port: ${{ secrets.rcon_port }}
          password: ${{ secrets.rcon_password }}
          commands: '["say hi", "reload"]'
```

## Available Arguments

| name | required | description | default | example |
|-|-|-|-|-|
| server | yes | The server IP |  | `127.0.0.1` |
| port | no | The RCON port | `25575` | `12345` |
| password | no | The password | `""` | `Sj3%ka"l`  |
| commands | no | Additional commands you want to run, in the form of a JSON String Array |  | `'["say hi", "reload"]'` |
| send-push-info | no | Whether a tellraw informing about the push should be sent | `true` |  |
| push-info-recipient | no | Changes the selector of the push info tellraw. | `@a` | `@a[tag=admin]` |

It is highly recommended to use [github secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) instead of plaintext inclusions for more sensitive data like the IP or the password.
