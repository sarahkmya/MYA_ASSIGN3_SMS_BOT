const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    FOOD: Symbol("food"),
    LITTER: Symbol("litter"),
    EXTRAS: Symbol("extras")
});

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSpecies = "";
        this.sFood = "";
        this.sLitter = "";
        this.sExtras = "";
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Waterloo Park's Pop-Up Eats.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if (sInput.toLowerCase() == "meow") {
                    this.sSpecies = "cat";
                } else if (sInput.toLowerCase() == "woof") {
                    this.sSpecies = "dog";
                } else {
                    this.stateCur = OrderState.WELCOMING;
                    aReturn.push("Please type MEOW if you have a cat or WOOF if you have a dog.");
                    break;
                }
                aReturn.push("Would you like CANNED or DRY food or NO?");
                break;
            case OrderState.FOOD:
                if (this.sSpecies == "cat") {
                    this.stateCur = OrderState.LITTER;
                    aReturn.push("Would you like kitty litter?");
                } else {
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Would you like a TREAT or TOY for your dog?");
                }
                if (sInput.toLowerCase() != "no") {
                    this.sFood = sInput;
                }
                break;
            case OrderState.LITTER:
                this.stateCur = OrderState.EXTRAS
                if (sInput.toLowerCase() != "no") {
                    this.sLitter = "organic kitty litter";
                }
                aReturn.push("Would you like a TREAT or TOY for your kitty?");
                break;
            case OrderState.EXTRAS:
                if (sInput.toLowerCase() != "no") {
                    this.sExtras = sInput;
                }
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if (this.sSpecies == "cat" && this.sFood.toLowerCase() == "canned") {
                    aReturn.push("canned cat food");
                    this.nTotal += 5.99;
                } else if (this.sSpecies == "cat" && this.sFood.toLowerCase == "dry") {
                    aReturn.push("dry cat food");
                    this.nTotal += 2.99
                } else if (this.sSpecies == "dog" && this.sFood.toLowerCase() == "canned") {
                    aReturn.push("canned dog food");
                    this.nTotal += 5.99;
                } else if (this.sSpecies == "dog" && this.sFood.toLowerCase == "dry") {
                    aReturn.push("dry dog food");
                    this.nTotal += 5.99
                }
                if (this.sLitter) {
                    aReturn.push(this.sLitter);
                    this.nTotal += 2.99;
                }
                if (this.sExtras) {
                    aReturn.push(this.sExtras);
                    this.nTotal += 2.99;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`
      <html>
      <head>
    
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/main.css" />
              
          <title>Home</title>
          </head>
          <body>
              
              <!-- your header here -->
              
              
      <nav>
          <div class="navbar navbar-inverse navbar-static-top">
              <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href=".">Portfolio of Sarah Mya</a>
              </div>
              <div class="navbar-collapse collapse">
                  <ul class="nav navbar-nav navbar-right">
                      
                  </ul>
              </div>
          </div>
      </nav>
              
              <main>
          <h1>Upcoming Popup Meals</h1>
                  <h2>Pasta with Wild Atlantic Shrimp</h2>
                  <p><img src="https://belleofthekitchen.com/wp-content/uploads/2019/09/one-pot-cheesy-italian-sausage-spaghetti-square-4.jpg" alt="Shrimp Pasta"</p>
                  <p>Pasta with a shrimp</p>
                  <p>Waterloo Park, Today at 5PM</p>
                  <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
                  <input type="hidden" name="title" value="Shrimp and Pasta" />
                  <input type="hidden" name="price" value="21" />
                  <input type="tel" placeholder="enter your number" name="telephone"/>
                  <button type="submit">Order now</button>
                  </form>
                  
                  <h2>Greek Food  Platter with  Sole Fish and  Cucumber Tzatziki</h2>
                  <p><img src="https://live.staticflickr.com/3926/15126323020_4a359464a5_b.jpg" alt="Greek Food Platter"</p>
                  <p>"Greek Food  Platter with  Sole Fish and  Cucumber Tzatziki</p>
                  <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
                  <input type="hidden" name="title" value="Greek Food Platter" />
                  <input type="hidden" name="price" value="21" />
                  <input type="tel" placeholder="enter your number" name="telephone"/>
                  <button type="submit">Order now</button>
                  </form>
                  
                  <h2>Spinach and Avocado Eggs Benedict</h2>
                  <p><img src="https://thekitchenpaper.com/wp-content/uploads/2015/11/Fried-Polenta-Poached-Egg-Breakfast-recipe-1.jpg" alt="Eggs Benedict"</p>
                  <p> Comes with sides of drink and fruit salad</p>
                  <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
                  <input type="hidden" name="title" value="Spinach and Avocado Eggs Benedict" />
                  <input type="hidden" name="price" value="21" />
                  <input type="tel" placeholder="enter your number" name="telephone"/>
                  <button type="submit">Order now</button>
                  </form>
                  
                  <h2>Mango Slush with Cracked Red Pepper</h2>
                  <p><img src="https://slushiemachineguide.com/wp-content/uploads/2019/08/mango-slushie-recipe.jpg" alt="Mango Slush"</p>
                  <p>Zesty mango slush to brighten and invigorate your day!</p>
                  <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
                  <input type="hidden" name="title" value="Mango Slush" />
                  <input type="hidden" name="price" value="21" />
                  <input type="tel" placeholder="enter your number" name="telephone"/>
                  <button type="submit">Order now</button>
                  </form>
                  
                  <h2>Seasonal Summer Tarts</h2>
                  <p><img src="https://d1ralsognjng37.cloudfront.net/d5f991e0-83dc-4a8d-8d95-bd80e0fff927.jpeg" alt="Fruit tart"</p>
                  <p>Seasonal Summer tarts with lemon, lime,  and vanilla custard. </p>
                  <form action="https://serene-taiga-04277.herokuapp.com/payment" method="post">
                  <input type="hidden" name="title" value="Fruit Tart" />
                  <input type="hidden" name="price" value="21" />
                  <input type="tel" placeholder="enter your number" name="telephone"/>
                  <button type="submit">Order now</button>
                  </form>
                  
          </main>
          
      <footer>
          &copy; <script>document.write(new Date().getFullYear())</script> Sarah Mya 
      </footer>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
              
          </body>
      </html>      `);

    }
}
