package hr.fer.wpu.flowerpower;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;



public class ProductListActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		//load category info
		Map<Category, List<Product>> categories = Utils.loadData();

		//scroll layout
		ScrollView scrollView = new ScrollView(this);
		scrollView.setBackgroundColor(getColor(R.color.white));

		//layout
		LinearLayout layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		layout.setBackgroundColor(getColor(R.color.white));


		Category cat = null;

		//get extras (reading the sent category from the intent)
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
			cat = (Category) extras.getSerializable("catObj");
		} else {
			//default category
			cat = new Category(1, "Flowers", "img1_flowers");
		}

		//display the category
		if (cat != null) {
			String catName = cat.getName();

			//category name
			TextView catNameLabel = new TextView(this);
			catNameLabel.setText(catName);
			catNameLabel.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT));
			catNameLabel.setTextSize(20);
			catNameLabel.setGravity(Gravity.START);
			layout.addView(catNameLabel);

			//display the products
			List<Product> proizvodi = categories.get(cat);

			for (Product pr : proizvodi) {
				//sub layout
				LinearLayout itemLayout = new LinearLayout(this);
				itemLayout.setOrientation(LinearLayout.HORIZONTAL);
				itemLayout.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
				itemLayout.setBackgroundColor(getColor(R.color.white));

				//product name
				TextView prodName = new TextView(this);
				prodName.setText(pr.getName());
				prodName.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT));
				prodName.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 2));
				prodName.setTextSize(24);
				prodName.setPadding(10, 0, 0, 0);
				prodName.setGravity(Gravity.START);
				itemLayout.addView(prodName);

				//+ button
				Button addBtn = new Button(this);
				addBtn.setText("+");
				addBtn.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
				addBtn.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
				addBtn.setOnClickListener(v -> Toast.makeText(ProductListActivity.this, R.string.add_to_cart_toast, Toast.LENGTH_SHORT).show()); //View v
				itemLayout.addView(addBtn);

				//info button
				Button infoBtn = new Button(this);
				infoBtn.setText("INFO");
				infoBtn.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
				infoBtn.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
				itemLayout.addView(infoBtn);

				//add sub layout to the main layout
				layout.addView(itemLayout);
			}
		}

		//draw the layout
		scrollView.addView(layout);
		this.setContentView(scrollView);

	}
}