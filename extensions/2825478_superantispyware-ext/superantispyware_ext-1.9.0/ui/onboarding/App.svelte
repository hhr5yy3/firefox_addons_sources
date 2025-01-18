<script lang="ts">
import Doc from './Doc.svelte'

import enable from '$lib/enable'
import {TITLE} from '$lib/consts'

let screen: 'screen1' | 'screen2' = 'screen1'

function next (enableIt: boolean) {
  enable(enableIt)
  screen = 'screen2'
}
</script>

{#if screen === 'screen1'}
  <main>
    <div class="container">
      <img
        src="../../resources/SASExt_logo.png"
        alt={TITLE}
      >
      <h1>
        Enable <span class="nobr">{TITLE}</span> for enhanced security and
        privcy protection
      </h1>
      <ul>
        <li class="none">
          Block ads and trackers
        </li>
        <li class="none">
          Protect yourself from malware, phishing and malicious websites
        </li>
        <li class="none">
          Block unwanted content according to you preferences
        </li>
      </ul>
      <p>
        <span class="nobr">{TITLE}</span> respects your privacy and does not
        transmit, collect or store any personal data, or any data that can be
        traced back to you.
      </p>
      <p>
        For further improvement of <span class="nobr">{TITLE}</span>,
        anonymous statistical data is collected in aggagated form, according to
        our <Doc href="/ui/legal/privacy-policy.html">Privacy Policy</Doc>
      </p>
      <button
        class="enable"
        on:click={() => next(true)}
      >
        Enable {TITLE}
      </button>
      <button
        class="keep-disabled"
        on:click={() => next(false)}
      >
        Keep disabled
      </button>
      <p>
        By enabling <span class="nobr">{TITLE}</span> you agree to our
        <Doc href="/ui/legal/privacy-policy.html">Privacy Policy</Doc> and
        <Doc href="/ui/legal/terms-of-use.html">Terms of Use</Doc>
      </p>
    </div>
  </main>
{:else if screen === 'screen2'}
  <main>
    <div class="container container--video">
      <video
        autoplay
        loop
        muted
        width="340"
      >
        <source
          src="assets/en-firefox-pin-w.webm"
          type="video/webm"
        >
      </video>
    </div>
    <div class="container container--text">
      <img
        src="/resources/SASExt_logo.png"
        alt={TITLE}
      >
      <h1>
        For always-on privacy protection,<br>
        make {TITLE}<br>
        visible in Firefox.
      </h1>
      <ol>
        <li class="one">
          <b>Click the ‘extensions’ icon</b><br>
          to the right of the address bar.
        </li>
        <li class="two">
          <b>Click the ‘cog’ icon</b> next to<br>
          {TITLE}, to pin it<br>
          to the toolbar.
        </li>
      </ol>
    </div>
  </main>
{/if}
