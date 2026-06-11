package hr.fer.wpu.flowerpower;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;

import java.util.List;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		//load category info
		Map<Category, List<Product>> Categories = Utils.loadData();

		//linear layout
		LinearLayout layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		layout.setBackgroundColor(getColor(R.color.white));

		//category button
		Button catBtn = new Button(this);
		catBtn.setText(R.string.main_cat);
		layout.addView(catBtn);
		catBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(MainActivity.this, CategoryListActivity.class);
				startActivity(intent);
			}
		});

		//info button
		Button infoBtn = new Button(this);
		infoBtn.setText("INFO");
		layout.addView(infoBtn);
		infoBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(MainActivity.this, InfoActivity.class);
				startActivity(intent);
			}
		});

		//price list button
		Button prcBtn = new Button(this);
		prcBtn.setText(R.string.main_price_btn);
		layout.addView(prcBtn);
		prcBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(Intent.ACTION_VIEW);
				intent.setDataAndType(Uri.parse("http://zpr.fer.hr/wim/cjenik.pdf"), "application/pdf");
				startActivity(intent);
			}
		});

		//draw the layout
		this.setContentView(layout);
	}
}