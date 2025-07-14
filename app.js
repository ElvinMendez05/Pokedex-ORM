import express from 'express';
import {engine} from 'express-handlebars';
import { projectRoot } from './utils/paths.js';
import path from 'path';
import homeRoutes from './router/home.js';
import pokemonRoutes from './router/pokemonesRoute.js';
// import seriesRoutes from './routes/seriesRoute.js';

const app = express();

//render engine
app.engine('hbs', engine({
   layoutsDir: "views/layouts",
   defaultLayout: "main",
   extname: "hbs",
   helpers: {
       section: function(name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }, eq: function(a, b) {
        return Number(a) === Number(b);
      },
   }
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(projectRoot, 'public')));

//routes 
app.use(homeRoutes);
app.use('/pokemones', pokemonRoutes);
// app.use('/series', seriesRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: "Page not found"});
});

app.listen(3000);