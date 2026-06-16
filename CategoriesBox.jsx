import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const categories = {
  "Fiction": ["Contemporary", "Literary", "Drama", "Satire", "Classic"],
  "Non-Fiction": ["Memoir", "Essay", "Travelogue", "True Story", "Journalism"],
  "Romance": ["Contemporary Romance", "Historical Romance", "Paranormal Romance", "Romantic Comedy", "Young Adult Romance"],
  "Science Fiction": ["Dystopian", "Space Opera", "Time Travel", "Cyberpunk", "Apocalyptic"],
  "Fantasy": ["Epic Fantasy", "Urban Fantasy", "Dark Fantasy", "Mythology Inspired", "Magical Realism"],
  "Mystery": ["Cozy Mystery", "Detective", "Police Procedural", "Whodunit", "Crime Noir"],
  "Thriller": ["Psychological Thriller", "Crime Thriller", "Action Thriller", "Legal Thriller", "Spy Thriller"],
  "Horror": ["Supernatural", "Gothic", "Monster", "Psychological", "Paranormal"],
  "Historical": ["Ancient", "Medieval", "Renaissance", "Victorian", "World Wars"],
  "Biography": ["Political", "Celebrity", "Literary Figures", "Historical Leaders", "Artists"],
  "Self-Help": ["Motivation", "Productivity", "Happiness", "Personal Growth", "Mindfulness"],
  "Business": ["Entrepreneurship", "Leadership", "Finance", "Marketing", "Management"],
  "Health & Fitness": ["Exercise", "Nutrition", "Mental Health", "Yoga", "Wellness"],
  "Education": ["Learning", "Teaching", "Academic Essays", "Study Guides", "Research"],
  "Poetry": ["Romantic Poetry", "Haiku", "Epic Poetry", "Modern Poetry", "Narrative Poetry"],
  "Cookbooks": ["Quick Recipes", "Baking", "Healthy Meals", "World Cuisine", "Vegetarian"],
  "Travel": ["Adventure Travel", "Backpacking", "Cultural Travel", "Nature Travel", "Travel Memoirs"],
  "Religion & Spirituality": ["Christianity", "Islam", "Hinduism", "Buddhism", "Philosophy of Religion"],
  "Children's": ["Picture Books", "Bedtime Stories", "Fairy Tales", "Animal Stories", "Moral Stories"],
  "Young Adult": ["Coming of Age", "Romance", "Fantasy", "Adventure", "Dystopian"],
  "Graphic Novels": ["Manga", "Superhero", "Fantasy", "Sci-Fi", "Drama"],
  "Comics": ["Superhero", "Comedy", "Fantasy", "Adventure", "Slice of Life"],
  "Art & Photography": ["Art History", "Photography Guides", "Design", "Painting", "Visual Arts"],
  "Science & Technology": ["Physics", "Biology", "Computer Science", "Space Science", "Engineering"],
  "Politics": ["Political Theory", "Elections", "International Relations", "Government", "Policy"],
  "Social Sciences": ["Sociology", "Psychology", "Anthropology", "Economics", "Cultural Studies"],
  "Philosophy": ["Ethics", "Metaphysics", "Logic", "Existentialism", "Political Philosophy"],
  "Music": ["Music Theory", "History of Music", "Musicians", "Genres", "Songwriting"],
  "Sports": ["Football", "Cricket", "Basketball", "Tennis", "Athletics"],
  "Humor": ["Satire", "Comedy Stories", "Dark Humor", "Parody", "Anecdotes"],
  "Classic Literature": ["Greek Classics", "Shakespeare", "Victorian", "Russian Classics", "American Classics"],
  "True Crime": ["Serial Killers", "Heists", "Investigations", "Court Cases", "Historical Crimes"],
  "Parenting": ["Pregnancy", "Childcare", "Teen Parenting", "Education", "Family Life"],
  "Lifestyle": ["Fashion", "Interior Design", "Minimalism", "DIY", "Hobbies"],
  "Environmental": ["Climate Change", "Wildlife", "Sustainability", "Nature Writing", "Eco Activism"],
  "Memoir": ["Celebrity Memoir", "Travel Memoir", "Personal Journey", "Historical Memoir", "Inspirational"],
  "Adventure": ["Survival Stories", "Exploration", "Action", "Quest", "Travel Adventure"],
  "Detective": ["Private Investigator", "Classic Detectives", "Modern Detectives", "Police Detectives", "Amateur Sleuths"],
  "Dystopian": ["Post-Apocalyptic", "Surveillance State", "Rebellion", "Climate Fiction", "Tech Dystopia"],
  "Essay": ["Personal Essays", "Critical Essays", "Philosophical Essays", "Satirical Essays", "Academic Essays"],
  "Short Stories": ["Anthology", "Flash Fiction", "Horror Stories", "Romantic Shorts", "Sci-Fi Shorts"],
  "Anthology": ["Poetry Collection", "Horror Anthology", "Romantic Anthology", "Sci-Fi Anthology", "Mixed Genre"],
};

export default function CategoriesBox() {
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-8 w-[700px] h-[450px] pt-2 mt-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-700 overflow-hidden">
      {/* Left side: categories */}
      <div className="col-span-3 border-r border-white/20 overflow-y-auto">
        <div className="flex flex-col gap-1 p-3">
          {Object.keys(categories).map((cat, index) => (
            <div
              key={index}
              onClick={() => setSelected(cat)}
              className={`text-black font-semibold text-left cursor-pointer px-4 py-2 rounded-xl transition-all duration-200
                ${
                  selected === cat
                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md"
                    : "hover:bg-rose-100"
                }`}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Right side: subcategories */}
      <div className="col-span-5 p-6 overflow-y-auto">
        {selected ? (
          <div>
            <h2 className="text-2xl font-bold text-rose-700 mb-4">{selected}</h2>
            <div className="flex flex-wrap gap-3">
              {categories[selected].map((sub, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/${selected}/${sub}`)}
                  className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer text-gray-800 font-medium border-2 border-solid border-black"
                >
                  {sub}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 italic">
            ← Select a category from the left to view subcategories
          </p>
        )}
      </div>
    </div>
  );
}