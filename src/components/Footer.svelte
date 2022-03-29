<script>

  import { footer } from "../utils/data";

  const currentYear = () => new Date().getFullYear().toString();

</script>

<div class="footer">
  <p>
    <a href='/contact' class="footer-item">
      {footer.copyright}
    </a>
    {" "} &#169; {currentYear()}{" "}
  </p>
</div>

<style>

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    font-weight: lighter;
  }

  .footer-item {
    transition: text-shadow .3s, color .3s;
  }

  .footer-item:hover {
    color: rgb(44, 44, 44);
    text-shadow: 0px 0px .3px rgb(93,93,93);
  }

</style>
