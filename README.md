# Plaqad Sign

Plaqad Sign is Plaqad's electronic signing service. It is a modified build of
[Documenso](https://github.com/documenso/documenso) Community Edition **v2.21.1**, distributed under the GNU Affero
General Public License v3.0.

Production runs at <https://sign.talent.plaqad.com>, where Plaqad Talent sends HR documents for signature.

## Changes from Documenso

Plaqad changes presentation only:

- product name, logos, icons, colours and page metadata;
- email presentation and default sender identity;
- "Powered by Documenso" attribution and an in-product link to this source code;
- default support address and PDF signature reason.

Signing, sealing, audit evidence, the API, webhooks and data handling are unchanged from upstream. This repository
is a fork of Documenso; the exact modifications are the commits on top of upstream tag `v2.21.1`
(`git log v2.21.1..main`).

## Source code offer

AGPL-3.0 section 13 requires offering every network user the source of the version they are using. Each release
links to its exact tag from the product footer through `PLAQAD_SIGN_SOURCE_URL` in
`packages/lib/constants/plaqad-sign.ts`. Release tags are named `v<upstream version>-plaqad.<n>`.

## Release

1. Set `PLAQAD_SIGN_RELEASE` in `packages/lib/constants/plaqad-sign.ts` to the new tag, commit and push `main`.
2. Tag that commit with the same name and push the tag.
3. From a clean checkout of the tag, build and push the image with Fly's remote builder. `fly.build.toml` builds
   from source; the production app config pins an image, so do not build with it:

   ```sh
   fly deploy --build-only --push -c fly.build.toml --image-label <tag>
   ```

4. Pin `registry.fly.io/plaqad-sign:<tag>@sha256:<digest>` in Plaqad Talent's `deploy/documenso/fly/fly.toml` and
   deploy by following that runbook. Roll back by redeploying the previously pinned digest.

## Upgrading Documenso

1. Fetch upstream tags: `git fetch upstream --tags` (`upstream` = <https://github.com/documenso/documenso>).
2. On a branch from `main`, rebase the Plaqad commits onto the new tag, resolving conflicts:
   `git rebase --onto <new-upstream-tag> <previous-upstream-tag>`.
3. Bump `PLAQAD_SIGN_RELEASE` and release as above. Upstream database migrations run on boot, so follow the Talent
   runbook's snapshot-before-upgrade step.

## Development

Development setup, configuration and self-hosting documentation are upstream's: <https://docs.documenso.com>. The
original project README is at <https://github.com/documenso/documenso/blob/v2.21.1/README.md>.

## License

- AGPL-3.0: see [LICENSE](./LICENSE).
- `packages/ee` remains under the Documenso Commercial License ([packages/ee/LICENSE](./packages/ee/LICENSE)). Plaqad
  Sign does not enable or modify Enterprise Edition features.
- Attribution and modification notice: [NOTICE](./NOTICE).

Report Plaqad Sign security issues to support@plaqad.com. Report vulnerabilities in Documenso itself through
[Documenso's security policy](https://github.com/documenso/documenso/security/policy).
